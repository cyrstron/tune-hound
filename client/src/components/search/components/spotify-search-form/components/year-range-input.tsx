import React, {Component} from 'react';
import {YearInput} from './year-input';

export interface YearRangeInputProps {
  onChange: (from: number, to: number) => void;
  fromValue: number;
  toValue: number;
}

class YearRangeInput extends Component<YearRangeInputProps> {
  onFromChange = (year: number) => {
    const {onChange, toValue} = this.props;

    onChange(year, toValue);
  }

  onToChange = (year: number) => {
    const {onChange, fromValue} = this.props;

    onChange(fromValue, year);
  }

  render() {
    const {toValue, fromValue} = this.props;

    return (
      <div>
        <YearInput 
          onChange={this.onFromChange} 
          value={fromValue} 
          label='From:'
        />
        <YearInput 
          onChange={this.onToChange} 
          value={toValue} 
          label='To:'
        />
      </div>
    );
  }
}

export {YearRangeInput};
