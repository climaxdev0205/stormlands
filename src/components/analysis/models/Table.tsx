import * as React from 'react';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 320,
        fontSize: '1rem',
        border: '1px solid #dadde9',
        whiteSpace: 'pre-line',
    },
}));

interface Column {
    id: string;
    label: string;
    minWidth?: number;
    maxWidth?: number;
    align?: string;
    format?: (value: number) => string;
}

interface Data {
    name: string;
    code: string;
    percent: boolean;
    decimalDigits?: number;

    [key: string]: any;
}

interface Units {
    [key: string]: string;
}

const units: Units = {
    'OreProduction': 'mt',
    'ZincGrade': '%',
    'ZincRevenue': 'USD',
    'LeadGrade': '%',
    'LeadRevenue': 'USD',
    'TotalRevenue': 'USD',
    'OperatingCost': 'USD',
    'OperatingMargin': 'USD',
    'CapitalCost': 'USD',
    'WorkingCapital': 'USD',
    'Royalties': 'USD',
    'CapitalAllowances': 'USD',
    'TaxableIncome': 'USD',
    'CorporateTaxes': 'USD',
    'Cashflow': 'USD',
    'CumulativeCashflow': 'USD',
    'DiscountedCashflow': 'USD',
    'CumulativeDiscountedCashflow': 'USD',
};

const getTooltips = (values: { [key: string]: string[] }) => {
    const zincPrice = values.ZincPrice?.[0] || 'N/A';
    const formattedZincPrice = formatNumberWithCommas(zincPrice, 0);
    const leadPrice = values.LeadPrice?.[0] || 'N/A';
    const formattedLeadPrice = formatNumberWithCommas(leadPrice, 0);

    // ExpendOverheads: Array(1).fill(0),
    // ExpendOpCost: Array(1).fill(0),
    // ExpendEnvCost: Array(1).fill(0),

    const formattedExpendOverheads = formatNumberWithCommas(values.ExpendOverheads[0], 0);
    const formattedExpendOpCost = formatNumberWithCommas(values.ExpendOpCost[0], 0);
    const formattedExpendEnvCost = formatNumberWithCommas(values.ExpendEnvCost[0], 0);
    const formattedExpendEnvCostClosure = formatNumberWithCommas(values.ExpendEnvCostClosure[0], 0);
    const totalOpCost = formatNumberWithCommas((parseFloat(values.ExpendOverheads[0]) + parseFloat(values.ExpendOpCost[0]) + parseFloat(values.ExpendEnvCost[0])).toString(), 2);
    return {
        'Zinc Revenue': `Zinc Price: $${formattedZincPrice}`,
        'Lead Revenue': `Lead Price: $${formattedLeadPrice}`,
        'Operating Cost': `Overhead Expenditure: $${formattedExpendOverheads}\n` +
            `Operating Cost: $${formattedExpendOpCost}\n` +
            `Environmental Cost: $${formattedExpendEnvCost}\n` +
            `Closure Lump Cost: $${formattedExpendEnvCostClosure}`,
    };
};

const formatNumberWithCommas = (number: string, decimalDigits: number) => {
    return parseFloat(number).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: decimalDigits,
    });
};

function createData(
    name: string,
    code: string,
    sizes: string[],
    percent: boolean,
    decimalDigits: number = 0
): Data {
    const data: Data = {
        name,
        code,
        percent,
        decimalDigits
    };

    sizes.forEach((size, index) => {
        if (size) {
            const number = parseFloat(size);
            const isNegative = number < 0;
            if (number === 0) {
                data[`size${index + 1}`] = '-';
            } else {
                const formattedSize = percent
                    ? formatNumberWithCommas(size, decimalDigits) + "%"
                    : formatNumberWithCommas(size, 0);

                data[`size${index + 1}`] = isNegative ? `{${formattedSize}}` : formattedSize;
            }
        } else {
            data[`size${index + 1}`] = '-';
        }
    });

    return data;
}

type Table = {
    id: any | null,
    dr: any | null,
    npv: any | null,
    irr: any | null,
}

interface Props {
    variables: string[] | null;
    values: {
        [key: string]: string[];
    };
    selectedRow: Table | null;
}

const StickyHeadTable: React.FC<Props> = ({ variables, values, selectedRow }) => {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(30);
    const [filteredVariables, setFilteredVariables] = useState<String[]>(variables || []);

    const constructionPeriod = parseFloat(values.ConstructionPeriod[0]);
    const mineLife =  Math.round(parseFloat(values.LifeOfMine[0])) + constructionPeriod;
    console.log("mineLife", mineLife);
    const formattedMineLife = formatNumberWithCommas(values.LifeOfMine[0], 2);

    const tooltips: { [key: string]: string } = getTooltips(values);

    const columns: Column[] = [
        { id: 'name', label: 'Number of Years', minWidth: 150 },
        { id: 'code', label: '', maxWidth: 20 },
        ...Array.from({ length: mineLife }, (_, i) => ({
            id: `size${i + 1}`,
            label: `${i + 1}`,
            minWidth: 100,
            align: 'right',
        })) as Column[],
    ];

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    function camelToSpaces(str: string) {
        return str
            .replace(/([A-Z])/g, ' $1') // insert a space before all capital letters
            .trim(); // trim the resulting string
    }
    function spacesToCamel(s: string) {
        return s.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join('');
    }

    let rows: Data[] = [];
    if (variables?.includes("All")) {
        // If "All" is selected, create Data for each key in the `values` object
        Object.keys(values).forEach((key) => {
            if (key !== "All") {
                let percent = false;
                if (key === 'ZincGrade' || key === 'LeadGrade') {
                    percent = true;
                }
                const valuesArray = values[key];
                rows.push(createData(camelToSpaces(key), units[key], valuesArray, percent));
            }
        });
        rows.push(createData('NPV', `${selectedRow?.dr}%`, selectedRow?.npv ? [selectedRow.npv] : [], false));
        rows.push(createData('IRR', '%', selectedRow?.irr ? [selectedRow.irr] : [], true, 2));
    } else {
        // Otherwise, create Data only for the selected variables
        console.log("variables", variables);
        (variables || []).forEach((variable: string) => {
            let percent = false;
            if (variable === 'Zinc Grade' || variable === 'Lead Grade') {
                percent = true;
            }
            if (variable !== 'NPV' && variable !== 'IRR') {
                const camelVariable = spacesToCamel(variable);
                const valuesArray = values[camelVariable] || [];
                rows.push(createData(variable, units[camelVariable], valuesArray, percent));
            }
            // If NPV or IRR are in the selected variables, create their rows
            if (variable === 'NPV') {
                rows.push(createData('NPV', `${selectedRow?.dr}%`, selectedRow?.npv ? [selectedRow.npv] : [], false));
            }
            if (variable === 'IRR') {
                rows.push(createData('IRR', '%', selectedRow?.irr ? [selectedRow.irr] : [], true, 2));
            }
        });
    }

    // Define the fields that need to be filtered
    const filterOutFields = ["Discount Rate", "Combined Metal Price",
        "Zinc Price", "Construction Period", "Life Of Mine",
        "Lead Price", "Expend Overheads", "Expend Op Cost",
        "Expend Env Cost", "Expend Env Cost Closure"];
    // Filter elements in the row if the first value exists in variables
    const filteredRows = rows.filter((row) => {
        if (variables && variables.includes("All")) {
            return !filterOutFields.includes(row.name);
        }
        return variables?.includes(row.name) && !filterOutFields.includes(row.name);
    });


    return (
        <div aria-hidden="true" className={"  overflow-x-hidden overflow-y-hid z-50 w-full h-full  items-center container mx-auto flex"}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 640 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column, index) => (
                                    <TableCell
                                        key={index}
                                        align={column.align as 'left' | 'right' | 'inherit' | 'center' | 'justify' | undefined}
                                        style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}
                                    >
                                        {column.label === 'Number of Years' ? (
                                            <HtmlTooltip title={
                                                <>
                                                    {`Construction Period: ${constructionPeriod} Year(s)`} <br />
                                                    {`Mine Life: ${formattedMineLife} Year(s)`}
                                                </>
                                            }
                                                placement="bottom">
                                                <span>{column.label}</span>
                                            </HtmlTooltip>
                                        ) : (
                                            column.label
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                            {columns.map((column, columnIndex) => {
                                                const value = row[column.id];
                                                const isNegative = value?.startsWith("{-") && value?.endsWith("}");
                                                const numericValue = isNegative ? parseFloat(value.substring(2, value.length - 1)) : parseFloat(value);
                                                const formattedValue = column.format && !isNaN(numericValue) ? column.format(numericValue) : value;
                                                const cellStyle = isNegative ? { color: "red" } : {};

                                                const tooltipContent = tooltips[row.name];

                                                // If there's a tooltip for this row, wrap the TableCell in a Tooltip component
                                                if (tooltipContent) {
                                                    return (
                                                        // eslint-disable-next-line react/jsx-key
                                                        <HtmlTooltip
                                                            title={
                                                                <React.Fragment>
                                                                    <b>{tooltipContent}</b>
                                                                </React.Fragment>
                                                            }
                                                        >
                                                            <TableCell key={columnIndex} align={column.align as 'left' | 'right' | 'inherit' | 'center' | 'justify' | undefined} style={cellStyle}>
                                                                {formattedValue}
                                                            </TableCell>
                                                        </HtmlTooltip>
                                                    );
                                                } else {
                                                    return (
                                                        <TableCell key={columnIndex} align={column.align as 'left' | 'right' | 'inherit' | 'center' | 'justify' | undefined} style={cellStyle}>
                                                            {formattedValue}
                                                        </TableCell>
                                                    );
                                                }
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 20, 30]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}

export default StickyHeadTable