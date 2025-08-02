import React, { PropsWithChildren } from 'react';
import { makeStyles } from '@mui/styles';
import { SidebarSearchModal } from '@backstage/plugin-search';
import {
  SidebarPage,
  Sidebar as BackstageSidebar,
  SidebarDivider,
  SidebarGroup,
  SidebarItem,
  SidebarScrollWrapper,
  SidebarSpace,
  useSidebarOpenState,
} from '@backstage/core-components';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CreateComponentIcon from '@mui/icons-material/AddCircleOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import DocsIcon from '@mui/icons-material/Description';
import CatalogIcon from '@mui/icons-material/MenuBook';
import ApiIcon from '@mui/icons-material/Extension';
import LogoFull from './LogoFull';
import LogoIcon from './LogoIcon';

const useSidebarLogoStyles = makeStyles({
  root: {
    width: 'auto',
    height: 32,
    marginLeft: 24,
  },
});

const SidebarLogo = () => {
  const classes = useSidebarLogoStyles();
  const { isOpen } = useSidebarOpenState();

  return (
    <div className={classes.root}>
      {isOpen ? <LogoFull /> : <LogoIcon />}
    </div>
  );
};

const SidebarScrollWrapper = ({ children }: PropsWithChildren<{}>) => (
  <div style={{ height: '100%', overflow: 'hidden auto' }}>
    {children}
  </div>
);

export const Root = ({ children }: PropsWithChildren<{}>) => (
  <SidebarPage>
    <BackstageSidebar>
      <SidebarLogo />
      <SidebarGroup label="Search" icon={<SearchIcon />} to="/search">
        <SidebarSearchModal />
      </SidebarGroup>
      <SidebarDivider />
      <SidebarGroup label="Menu" icon={<MenuIcon />}>
        {/* Global nav, not org-specific */}
        <SidebarItem icon={HomeIcon} to="catalog" text="Home" />
        <SidebarItem icon={DocsIcon} to="docs" text="Docs" />
        <SidebarItem icon={CreateComponentIcon} to="create" text="Create..." />
        {/* End global nav */}
        <SidebarDivider />
        <SidebarScrollWrapper>
          <SidebarItem icon={CatalogIcon} to="catalog" text="Catalog" />
          <SidebarItem icon={ApiIcon} to="api-docs" text="APIs" />
          <SidebarItem icon={DocsIcon} to="docs" text="TechDocs" />
          <SidebarItem icon={CatalogIcon} to="catalog-graph" text="Graph" />
        </SidebarScrollWrapper>
      </SidebarGroup>
      <SidebarSpace />
      <SidebarDivider />
      <SidebarGroup
        label="Settings"
        icon={<SettingsIcon />}
        to="/settings"
      >
        <SidebarItem icon={SettingsIcon} to="/settings" text="Settings" />
      </SidebarGroup>
    </BackstageSidebar>
    {children}
  </SidebarPage>
);

