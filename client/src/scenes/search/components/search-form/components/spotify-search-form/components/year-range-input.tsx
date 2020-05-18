import React, {Component} from 'react';
import {YearInput} from './year-input';

export interface YearRangeInputProps {
  onChange: (from?: number, to?: number) => void;
  fromValue?: number;
  toValue?: number;
  disabled?: boolean;
}

export interface YearRangeInputState {
  isRange: boolean;
}

class YearRangeInput extends Component<YearRangeInputProps, YearRangeInputState> {
  state: YearRangeInputState = {
    isRange: false,
  }

  onRangeToggle = () => {
    const {onChange, fromValue} = this.props;
    const {isRange} = this.state;

    const nextIsRange = !isRange;

    if (nextIsRange) {
      onChange(fromValue, new Date().getFullYear());
    } else {
      onChange(fromValue);
    }

    this.setState({
      isRange: nextIsRange,
    });
  }

  onFromChange = (year: number) => {
    const {onChange, toValue} = this.props;
    const {isRange} = this.state;

    if (year === undefined && isRange) {
      this.setState({isRange: false});
    }

    if (isRange && toValue !== undefined && toValue < year) {
      onChange(year, year);
    } else if (isRange) {
      onChange(year, toValue);
    } else {
      onChange(year);
    }
  }

  onToChange = (year?: number) => {
    const {onChange, fromValue} = this.props;

    if (year === undefined) {
      this.onRangeToggle();
    } else if (fromValue !== undefined && year < fromValue) {
      onChange(fromValue, fromValue);
    } else {
      onChange(fromValue, year);
    }
  }

  render() {
    const {toValue, fromValue, disabled} = this.props;
    const {isRange} = this.state;

    return (
      <div>
        {isRange && (
          <>
            Years:'
            <br/>
          </>
        )}
        <YearInput
          onChange={this.onFromChange}
          value={fromValue || null}
          label={isRange ? 'From:' : 'Years:'}
          disabled={disabled}
        />
        {isRange && (
          <YearInput
            onChange={this.onToChange}
            value={toValue || null}
            label='To:'
            disabled={disabled}
          />
        )}
        {!disabled && fromValue !== undefined && (
          <button onClick={this.onRangeToggle}>
            {isRange ? 'Distinct' : 'Range'}
          </button>
        )}
      </div>
    );
  }
}

export {YearRangeInput};
