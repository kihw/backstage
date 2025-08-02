import React from 'react';
import { Content, Header, Page } from '@backstage/core-components';
import { SearchFilter, SearchResult } from '@backstage/plugin-search-react';
import {
  CatalogSearchResultListItem,
} from '@backstage/plugin-catalog';
import { TechDocsSearchResultListItem } from '@backstage/plugin-techdocs';

export const searchPage = (
  <Page themeId="home">
    <Header title="Search" />
    <Content>
      <SearchFilter.Select
        className="search-filter"
        label="Kind"
        name="kind"
        values={['Component', 'Template']}
      />
      <SearchFilter.Checkbox
        className="search-filter"
        label="Lifecycle"
        name="lifecycle"
        values={['experimental', 'production']}
      />
      <SearchResult>
        <CatalogSearchResultListItem icon={<div />} />
        <TechDocsSearchResultListItem icon={<div />} />
      </SearchResult>
    </Content>
  </Page>
);