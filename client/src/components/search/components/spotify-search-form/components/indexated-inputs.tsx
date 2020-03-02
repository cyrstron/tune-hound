import React, {Component, HTMLProps, ChangeEvent} from 'react';
import {IndexatedInput} from './indexated-input';

export interface IndexatedInputsProps {
  values?: string[]
  onChange: (values: string[]) => void;
  label: string;
}

class IndexatedInputs extends Component<IndexatedInputsProps> {
  onAddAndQuery = () => {
    const {onChange, values} = this.props;

    if (!values) return;

    onChange([...values, '']);
  }

  onAndChange = (index: number, value: string) => {
    const {onChange, values} = this.props;

    if (!values) {
      onChange([value]);
    } else if (values.length > 1 && !value) {
      onChange([
        ...values.slice(0, index),
        ...values.slice(index + 1)
      ]);
    } else {
      onChange([
        ...values.slice(0, index),
        value,
        ...values.slice(index + 1)
      ]);
    };
  }

  render() {
    const {values, label} = this.props;

    const hasAddButton = !!values && !!values[values.length - 1];

    return (
      <div>
        <div>{label}</div>
        {(values || ['']).map((value, index) => (
          <IndexatedInput 
            value={value} 
            onChange={this.onAndChange} 
            index={index} 
            key={index}
          />
        ))}
        {hasAddButton && (
          <button onClick={this.onAddAndQuery}>+</button>
        )}
      </div>
    );
  }
}

export {IndexatedInputs}
