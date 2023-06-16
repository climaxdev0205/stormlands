import React from 'react';

function NumberFormatCustom(props: { [x: string]: any; value?: any; onChange?: any; }, ref: React.LegacyRef<HTMLInputElement> | undefined) {
    const { onChange, ...other } = props;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/,/g, '');
        onChange({ target: { value } });
    };

    const formattedValue = (value: string) => {
        const parsedValue = parseFloat(value);
        return isNaN(parsedValue) ? '' : parsedValue.toLocaleString();
    };

    return (
        <input
            {...other}
            ref={ref}
            type="text"
            onChange={handleChange}
            value={formattedValue(props.value)}
        />
    );
}

export default React.forwardRef<HTMLInputElement, any>(NumberFormatCustom);