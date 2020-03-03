import React, {Component, ChangeEvent, HTMLProps} from 'react';

export interface YearInputProps extends Omit<HTMLProps<HTMLInputElement>, 'onChange'> {
  onChange: (year: number) => void;
  value: number;
  label: string;
}

class YearInput extends Component<YearInputProps> {
  maxYear: number = new Date().getFullYear();

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {onChange} = this.props;

    let value = +e.target.value;

    if (value > this.maxYear) {
      value = this.maxYear;
    }

    onChange(value);
  }

  render() {
    const {onChange, label, ...props} = this.props;

    return (
      <label>
        {label}
        <input 
          {...props}
          onChange={this.onChange}
        />
      </label>
    );
  }
}

export {YearInput};
