import React, {Component, HTMLProps, ChangeEvent} from 'react';

export interface IndexatedInputProps extends Omit<HTMLProps<HTMLInputElement>, 'onChange'> {
  index: number;
  onChange: (index: number, value: string) => void;
}

class IndexatedInput extends Component<IndexatedInputProps> {
  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    const {index, onChange} = this.props;

    onChange(index, value);
  }

  render() {
    const {index, onChange, ...props} = this.props;
    return (
      <input {...props} onChange={this.onChange} />
    );
  }
}

export {IndexatedInput};
