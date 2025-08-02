import React from 'react';
import {
  EntityHasComponentsCard,
  EntityHasResourcesCard,
  EntityHasSubcomponentsCard,
  EntityHasSystemsCard,
  EntityLayout,
  EntityLinksCard,
  EntitySwitch,
  EntityOrphanWarning,
  EntityProcessingErrorsPanel,
  isComponentType,
  isKind,
  hasCatalogProcessingErrors,
  isOrphan,
} from '@backstage/plugin-catalog';
import {
  EntityApiDefinitionCard,
  EntityConsumedApisCard,
  EntityConsumingComponentsCard,
  EntityHasApisCard,
} from '@backstage/plugin-api-docs';
import {
  Direction,
  EntityCatalogGraphCard,
} from '@backstage/plugin-catalog-graph';
import {
  isGithubActionsAvailable,
  EntityGithubActionsContent,
} from '@backstage/plugin-github-actions';
import {
  EntityUserProfileCard,
  EntityGroupProfileCard,
  EntityMembersListCard,
  EntityOwnershipCard,
} from '@backstage/plugin-org';
import { EntityTechdocsContent } from '@backstage/plugin-techdocs';
import { EmptyState } from '@backstage/core-components';
import {
  Content,
  InfoCard,
  Button,
} from '@backstage/core-components';

const entityWarningContent = (
  <>
    <EntitySwitch>
      <EntitySwitch.Case if={isOrphan}>
        <EntityOrphanWarning />
      </EntitySwitch.Case>
    </EntitySwitch>

    <EntitySwitch>
      <EntitySwitch.Case if={hasCatalogProcessingErrors}>
        <EntityProcessingErrorsPanel />
      </EntitySwitch.Case>
    </EntitySwitch>
  </>
);

const overviewContent = (
  <Content>
    {entityWarningContent}
    <EntityLayout>
      <EntityLayout.Route path="/" title="Overview">
        <InfoCard title="AI Studio Service">
          <p>Service faisant partie de l'écosystème AI Studio</p>
        </InfoCard>
        <EntityLinksCard />
        <EntityHasSubcomponentsCard variant="gridItem" />
        <EntityHasApisCard variant="gridItem" />
        <EntityHasResourcesCard variant="gridItem" />
      </EntityLayout.Route>
    </EntityLayout>
  </Content>
);

const serviceEntityPage = (
  <EntityLayout>
    <EntityLayout.Route path="/" title="Overview">
      {overviewContent}
    </EntityLayout.Route>

    <EntityLayout.Route path="/ci-cd" title="CI/CD">
      <EntitySwitch>
        <EntitySwitch.Case if={isGithubActionsAvailable}>
          <EntityGithubActionsContent />
        </EntitySwitch.Case>

        <EntitySwitch.Case>
          <EmptyState
            title="No CI/CD available for this entity"
            missing="info"
            description="You need to add an annotation to your component if you want to enable CI/CD for it. You can read more about annotations in Backstage by clicking the button below."
            action={
              <Button
                variant="contained"
                color="primary"
                href="https://backstage.io/docs/features/software-catalog/well-known-annotations"
              >
                Read more
              </Button>
            }
          />
        </EntitySwitch.Case>
      </EntitySwitch>
    </EntityLayout.Route>

    <EntityLayout.Route path="/api" title="API">
      <EntitySwitch>
        <EntitySwitch.Case if={isKind('api')}>
          <EntityApiDefinitionCard />
        </EntitySwitch.Case>

        <EntitySwitch.Case>
          <EntityHasApisCard />
        </EntitySwitch.Case>
      </EntitySwitch>
    </EntityLayout.Route>

    <EntityLayout.Route path="/dependencies" title="Dependencies">
      <EntityCatalogGraphCard variant="gridItem" direction={Direction.TOP_BOTTOM} />
    </EntityLayout.Route>

    <EntityLayout.Route path="/docs" title="Docs">
      <EntityTechdocsContent />
    </EntityLayout.Route>
  </EntityLayout>
);

const websiteEntityPage = (
  <EntityLayout>
    <EntityLayout.Route path="/" title="Overview">
      {overviewContent}
    </EntityLayout.Route>

    <EntityLayout.Route path="/ci-cd" title="CI/CD">
      <EntitySwitch>
        <EntitySwitch.Case if={isGithubActionsAvailable}>
          <EntityGithubActionsContent />
        </EntitySwitch.Case>

        <EntitySwitch.Case>
          <EmptyState
            title="No CI/CD available for this entity"
            missing="info"
            description="You need to add an annotation to your component if you want to enable CI/CD for it."
          />
        </EntitySwitch.Case>
      </EntitySwitch>
    </EntityLayout.Route>

    <EntityLayout.Route path="/dependencies" title="Dependencies">
      <EntityCatalogGraphCard variant="gridItem" direction={Direction.TOP_BOTTOM} />
    </EntityLayout.Route>

    <EntityLayout.Route path="/docs" title="Docs">
      <EntityTechdocsContent />
    </EntityLayout.Route>
  </EntityLayout>
);

/**
 * NOTE: This page is designed to work on small screens such as mobile devices.
 * This is based on Material UI Grid. If breakpoints are used, each grid item must set the `xs` prop to a column size or to `true`,
 * since this does not default. If no breakpoints are used, the items will equitably share the available space.
 * https://material-ui.com/components/grid/#basic-grid.
 */

const defaultEntityPage = (
  <EntityLayout>
    <EntityLayout.Route path="/" title="Overview">
      {overviewContent}
    </EntityLayout.Route>

    <EntityLayout.Route path="/docs" title="Docs">
      <EntityTechdocsContent />
    </EntityLayout.Route>
  </EntityLayout>
);

const componentPage = (
  <EntitySwitch>
    <EntitySwitch.Case if={isComponentType('service')}>
      {serviceEntityPage}
    </EntitySwitch.Case>

    <EntitySwitch.Case if={isComponentType('website')}>
      {websiteEntityPage}
    </EntitySwitch.Case>

    <EntitySwitch.Case>{defaultEntityPage}</EntitySwitch.Case>
  </EntitySwitch>
);

const apiPage = (
  <EntityLayout>
    <EntityLayout.Route path="/" title="Overview">
      <EntityLayout>
        <EntityLayout.Route path="/" title="Overview">
          <EntityApiDefinitionCard />
          <EntityConsumedApisCard />
          <EntityConsumingComponentsCard />
        </EntityLayout.Route>
      </EntityLayout>
    </EntityLayout.Route>

    <EntityLayout.Route path="/definition" title="Definition">
      <EntityApiDefinitionCard />
    </EntityLayout.Route>
  </EntityLayout>
);

const userPage = (
  <EntityLayout>
    <EntityLayout.Route path="/" title="Overview">
      <EntityUserProfileCard variant="gridItem" />
      <EntityOwnershipCard variant="gridItem" />
    </EntityLayout.Route>
  </EntityLayout>
);

const groupPage = (
  <EntityLayout>
    <EntityLayout.Route path="/" title="Overview">
      <EntityGroupProfileCard variant="gridItem" />
      <EntityOwnershipCard variant="gridItem" />
      <EntityMembersListCard />
    </EntityLayout.Route>
  </EntityLayout>
);

const systemPage = (
  <EntityLayout>
    <EntityLayout.Route path="/" title="Overview">
      <EntityHasComponentsCard variant="gridItem" />
      <EntityHasApisCard variant="gridItem" />
      <EntityHasResourcesCard variant="gridItem" />
    </EntityLayout.Route>
    <EntityLayout.Route path="/diagram" title="Diagram">
      <EntityCatalogGraphCard
        variant="gridItem"
        direction={Direction.TOP_BOTTOM}
        title="System Diagram"
        height={700}
      />
    </EntityLayout.Route>
  </EntityLayout>
);

const domainPage = (
  <EntityLayout>
    <EntityLayout.Route path="/" title="Overview">
      <EntityHasSystemsCard variant="gridItem" />
    </EntityLayout.Route>
  </EntityLayout>
);

export const entityPage = (
  <EntitySwitch>
    <EntitySwitch.Case if={isKind('component')} children={componentPage} />
    <EntitySwitch.Case if={isKind('api')} children={apiPage} />
    <EntitySwitch.Case if={isKind('group')} children={groupPage} />
    <EntitySwitch.Case if={isKind('user')} children={userPage} />
    <EntitySwitch.Case if={isKind('system')} children={systemPage} />
    <EntitySwitch.Case if={isKind('domain')} children={domainPage} />

    <EntitySwitch.Case>{defaultEntityPage}</EntitySwitch.Case>
  </EntitySwitch>
);