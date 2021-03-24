import React, { Component, ChangeEvent, MouseEvent } from "react";
import {
  DeezerSearchOptions,
  DeezerNamespaceSearchOptions,
} from "@app/state/deezer/types";

export interface DeezerBasicSearchFormProps {
  onChange: (params: DeezerSearchOptions) => void;
  searchParams: DeezerNamespaceSearchOptions;
  isAdvanced: boolean;
  toggleAdvance: () => void;
}

class DeezerBasicSearchFormComponent extends Component<DeezerBasicSearchFormProps> {
  onToggleAdvance = (e: MouseEvent) => {
    e.preventDefault();

    this.props.toggleAdvance();
  };

  onQueryChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    const { searchParams, onChange } = this.props;

    onChange({
      ...searchParams,
      query: value,
    });
  };

  render() {
    const {
      searchParams: { query },
      isAdvanced,
    } = this.props;

    return (
      <>
        <input type="text" onChange={this.onQueryChange} value={query} />
        <button type="submit">Search</button>
        <button onClick={this.onToggleAdvance}>
          Advanced {isAdvanced ? "⇑" : "⇓"}
        </button>
      </>
    );
  }
}

export { DeezerBasicSearchFormComponent };
