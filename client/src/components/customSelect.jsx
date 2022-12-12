import Select from 'react-select';

const CustomSelect = ({ props }) => {
    return (
        <Select
            {...props}
            className="basic-multi-select"
            classNamePrefix="select"
            styles={{
                control: (baseStyles) => ({
                    ...baseStyles,
                    fontSize: '0.8em',
                    color: '#fff',
                    background: '#d63031',
                    
                }),
                menu: (baseStyles) => ({
                    ...baseStyles,
                    padding: 0,
                    border: 'unset',
                    background: '#d63031'
                }),
                dropdownIndicator: (baseStyles) => ({
                    ...baseStyles,
                    color: '#fff'
                }),
                option: (baseStyles) => ({
                    ...baseStyles,
                    color: '#fff',
                    background: '#d63031',
                    fontSize: '0.8em',
                    margin: 'unset',
                    transition: 'all 200ms ease-in-out',
                    cursor: 'pointer',
                    '&:hover': {
                        opacity: '.8'
                    }
                }),
                placeholder: (baseStyles) => ({
                    ...baseStyles,
                    color: '#fff'
                }),
                multiValueLabel: (baseStyles) => ({
                    ...baseStyles,
                    color: '#d63031'
                }),
                multiValueRemove: (baseStylews) => ({
                    color: '#d63031'
                }),
                singleValue: (baseStyles) => ({
                    ...baseStyles,
                    color: '#fff'
                }),
                input: (baseStyles) => ({
                    ...baseStyles,
                    color: '#fff'
                })
            }}
        />
    )
}

export default CustomSelect;