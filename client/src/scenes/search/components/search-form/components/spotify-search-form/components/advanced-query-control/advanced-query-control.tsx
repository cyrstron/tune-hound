import React, { Component, ChangeEvent } from "react";
import {
  SpotifyAdvancedSearchQuery,
  SpotifySearchItemType,
  SpotifyAlbumAdvancedSearchQuery,
  SpotifyArtistAdvancedSearchQuery,
  SpotifyTrackAdvancedSearchQuery,
  SpotifySearchTagType,
} from "@app/state/spotify/types";
import { IndexatedInputs } from "../indexated-inputs";
import { YearRangeInput } from "../year-range-input";

export interface AdvancedQueryControl {
  query?: SpotifyAdvancedSearchQuery;
  type: SpotifySearchItemType;
  onChange: (query: SpotifyAdvancedSearchQuery) => void;
}

export class AdvancedQueryControlComponent extends Component<AdvancedQueryControl> {
  onAndChange = (values: string[]) => {
    const { onChange, query } = this.props;

    onChange({
      ...(query || {}),
      and: values,
    });
  };

  onOrChange = (values: string[]) => {
    const { onChange, query } = this.props;

    if (!query) return;

    onChange({
      ...(query || {}),
      or: values,
    });
  };

  onNotChange = (values: string[]) => {
    const { onChange, query } = this.props;

    if (!query) return;

    onChange({
      ...(query || {}),
      not: values,
    });
  };

  onTrackChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const { onChange, query, type } = this.props;

    if (type === "playlist" || type === "track") return;

    onChange({
      ...(query || {}),
      track: value,
    } as SpotifyArtistAdvancedSearchQuery | SpotifyAlbumAdvancedSearchQuery);
  };

  onAlbumChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const { onChange, query, type } = this.props;

    if (type === "playlist" || type === "album") return;

    onChange({
      ...(query || {}),
      album: value,
    } as SpotifyArtistAdvancedSearchQuery | SpotifyTrackAdvancedSearchQuery);
  };

  onArtistChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const { onChange, query, type } = this.props;

    if (type === "playlist" || type === "artist") return;

    onChange({
      ...(query || {}),
      artist: value,
    } as SpotifyTrackAdvancedSearchQuery | SpotifyAlbumAdvancedSearchQuery);
  };

  onGenreChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const { onChange, query, type } = this.props;

    if (type === "playlist") return;

    onChange({
      ...(query || {}),
      genre: value,
    } as SpotifyTrackAdvancedSearchQuery | SpotifyAlbumAdvancedSearchQuery | SpotifyArtistAdvancedSearchQuery);
  };

  onTagChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const { onChange, query, type } = this.props;

    if (type !== "album") return;

    onChange({
      ...(query || {}),
      tag: value ? (value as SpotifySearchTagType) : undefined,
    } as SpotifyAlbumAdvancedSearchQuery);
  };

  onYearChange = (fromYear?: number, toYear?: number) => {
    const { onChange, query } = this.props;

    onChange({
      ...(query || {}),
      year:
        toYear !== undefined
          ? {
              from: fromYear,
              to: toYear,
            }
          : fromYear,
    } as SpotifyAlbumAdvancedSearchQuery);
  };

  render() {
    const { query, type } = this.props;

    const hasOtherFields =
      query && (query.and?.length > 1 || query.and?.[0] !== "");

    return (
      <div>
        <IndexatedInputs
          label="Search keys:"
          values={query && query.and}
          onChange={this.onAndChange}
        />
        <IndexatedInputs
          label="Include:"
          values={query && query.or}
          onChange={this.onOrChange}
          disabled={!hasOtherFields}
        />
        <IndexatedInputs
          label="Exclude:"
          values={query && query.not}
          onChange={this.onNotChange}
          disabled={!hasOtherFields}
        />
        {type !== "track" && type !== "playlist" && (
          <div>
            <label>
              Track:{" "}
              <input
                value={query && "track" in query ? query.track : ""}
                onChange={this.onTrackChange}
                disabled={!hasOtherFields}
              />
            </label>
          </div>
        )}
        {type !== "album" && type !== "playlist" && (
          <div>
            <label>
              Album:{" "}
              <input
                value={query && "album" in query ? query.album : ""}
                onChange={this.onAlbumChange}
                disabled={!hasOtherFields}
              />
            </label>
          </div>
        )}
        {type !== "artist" && type !== "playlist" && (
          <div>
            <label>
              Artist:{" "}
              <input
                value={query && "artist" in query ? query.artist : ""}
                onChange={this.onArtistChange}
                disabled={!hasOtherFields}
              />
            </label>
          </div>
        )}
        {type !== "playlist" && (
          <div>
            <label>
              Genre:{" "}
              <input
                value={query && "genre" in query ? query.genre : ""}
                onChange={this.onGenreChange}
                disabled={!hasOtherFields}
              />
            </label>
          </div>
        )}
        {type === "album" && (
          <div>
            Tag:
            <br />
            <label>
              <input
                name="spotify-search-tag"
                checked={!query || !("tag" in query) || !query.tag}
                onChange={this.onTagChange}
                disabled={!hasOtherFields}
                type="radio"
                value=""
              />{" "}
              None
            </label>
            <label>
              <input
                name="spotify-search-tag"
                checked={query && "tag" in query && query.tag === "new"}
                onChange={this.onTagChange}
                disabled={!hasOtherFields}
                type="radio"
                value="new"
              />{" "}
              New
            </label>
            <label>
              <input
                name="spotify-search-tag"
                checked={query && "tag" in query && query.tag === "hipster"}
                onChange={this.onTagChange}
                disabled={!hasOtherFields}
                type="radio"
                value="hipster"
              />{" "}
              Rare
            </label>
          </div>
        )}
        <YearRangeInput
          onChange={this.onYearChange}
          fromValue={
            query &&
            (typeof query.year === "object" ? query.year.from : query.year)
          }
          toValue={
            query?.year && typeof query.year === "object"
              ? query.year.to
              : undefined
          }
          disabled={!hasOtherFields}
        />
      </div>
    );
  }
}
