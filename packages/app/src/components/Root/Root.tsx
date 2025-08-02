import React, { PropsWithChildren } from 'react';
import { makeStyles } from '@material-ui/core';
import { Header, Page, Sidebar, SidebarPage } from '@backstage/core-components';
import { NavLogo } from './NavLogo';
import { SidebarSearchModal } from '@backstage/plugin-search';
import {
  Sidebar as BackstageSidebar,
  SidebarDivider,
  SidebarGroup,
  SidebarItem,
  SidebarSpace,
  useSidebarOpenState,
} from '@backstage/core-components';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import CreateComponentIcon from '@material-ui/icons/AddCircleOutline';
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
        <SidebarItem icon={CreateComponentIcon} to="catalog" text="Home" />
        <SidebarItem icon={CreateComponentIcon} to="docs" text="Docs" />
        <SidebarItem icon={CreateComponentIcon} to="create" text="Create..." />
        {/* End global nav */}
        <SidebarDivider />
        <SidebarScrollWrapper>
          <SidebarItem icon={CreateComponentIcon} to="catalog" text="Catalog" />
          <SidebarItem icon={CreateComponentIcon} to="api-docs" text="APIs" />
          <SidebarItem icon={CreateComponentIcon} to="techdocs" text="TechDocs" />
          <SidebarItem icon={CreateComponentIcon} to="catalog-graph" text="Graph" />
        </SidebarScrollWrapper>
      </SidebarGroup>
      <SidebarSpace />
      <SidebarDivider />
      <SidebarGroup
        label="Settings"
        icon={<UserSettingsSignInAvatar />}
        to="/settings"
      >
        <SidebarSettings />
      </SidebarGroup>
    </BackstageSidebar>
    {children}
  </SidebarPage>
);

const SidebarScrollWrapper = ({ children }: PropsWithChildren<{}>) => (
  <div style={{ height: '100%', overflow: 'hidden auto' }}>
    {children}
  </div>
);

// Placeholder components - you'll need to implement these or use existing ones
const UserSettingsSignInAvatar = () => <MenuIcon />;
const SidebarSettings = () => null;