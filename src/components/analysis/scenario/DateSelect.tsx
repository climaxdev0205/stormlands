import * as React from 'react';
import {Grid, Table, TableBody, TableCell, TableHead, TableRow, TextField} from "@mui/material";

type Props = {
    startYear: number;
    endYear: number;
};

const DateSelect: React.FC<Props> = ({ startYear, endYear }) => {
    const [year, setYear] = React.useState(new Date().getFullYear());
    const [month, setMonth] = React.useState(new Date().getMonth() + 1);

    const daysInMonth = (year: number, month: number) => {
        return new Date(year, month, 0).getDate();
    };

    const firstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month - 1, 1).getDay();
    };

    const renderCalendar = () => {
        const numDays = daysInMonth(year, month);
        const firstDay = firstDayOfMonth(year, month);
        const days = [];

        for (let i = 0; i < firstDay; i++) {
            days.push(<td key={`empty-${i}`}></td>);
        }

        for (let i = 1; i <= numDays; i++) {
            days.push(<td key={`day-${i}`}>{i}</td>);
        }

        const rows: any[] = [];
        let cells: any[] = [];

        days.forEach((day, i) => {
            if (i % 7 !== 0) {
                cells.push(day);
            } else {
                rows.push(<tr key={`row-${i}`}>{cells}</tr>);
                cells = [];
                cells.push(day);
            }

            if (i === days.length - 1) {
                rows.push(<tr key={`row-${i}`}>{cells}</tr>);
            }
        });

        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <TextField type="text" value={year} onChange={(e) => {
                                const value = e.target.value;
                                // @ts-ignore
                                setYear(value);
                            }} />
                        </TableCell>
                        <TableCell>
                            <TextField type="text" value={month} onChange={(e) => {
                                const value = e.target.value;
                                // @ts-ignore
                                setMonth(value);
                            }} />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Mon</TableCell>
                        <TableCell>Tue</TableCell>
                        <TableCell>Wed</TableCell>
                        <TableCell>Thu</TableCell>
                        <TableCell>Fri</TableCell>
                        <TableCell>Sat</TableCell>
                        <TableCell>Sun</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{rows}</TableBody>
            </Table>
        );
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {renderCalendar()}
            </Grid>
        </Grid>
    );
}

export default DateSelect;