import React, { Component, ChangeEvent, HTMLProps } from 'react';

export interface YearInputProps extends Omit<HTMLProps<HTMLInputElement>, 'onChange' | 'value'> {
  onChange: (year: number) => void;
  value: number | null;
  label: string;
}

class YearInput extends Component<YearInputProps> {
  maxYear: number = new Date().getFullYear();

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { onChange } = this.props;

    let value = +e.target.value;

    if (value > this.maxYear) {
      value = this.maxYear;
    }

    onChange(value);
  };

  render() {
    const { onChange, label, value, ...props } = this.props;

    return (
      <label>
        {label} <input {...props} value={value || ''} onChange={this.onChange} />
      </label>
    );
  }
}

export { YearInput };
