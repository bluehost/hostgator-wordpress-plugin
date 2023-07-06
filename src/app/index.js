import './tailwind.css';
import './stylesheet.scss';

import AppStore, { AppStoreProvider } from './data/store';
import { Root } from "@yoast/ui-library";
import { useLocation, HashRouter as Router } from 'react-router-dom';
import { __ } from '@wordpress/i18n';
import { SnackbarList, Spinner } from '@wordpress/components';
import classnames from 'classnames';
import AppRoutes from './data/routes';
import ErrorCard from './components/errorCard';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { store as noticesStore } from '@wordpress/notices';
import { setActiveSubnav } from './util/helpers';
import { kebabCase, filter } from 'lodash';
import { AppNav } from './components/app-nav';
import { NotificationFeed } from './components/notifications/feed';

// component sourced from module
import { default as NewfoldNotifications } from '../../vendor/newfold-labs/wp-module-notifications/assets/js/components/notifications/'; 
// to pass to notifications module
import apiFetch from '@wordpress/api-fetch'; 
import { useState } from '@wordpress/element';

const Notices = () => {
	if ('undefined' === typeof noticesStore) {
		return null;
	}
	const notices = useSelect(
		(select) =>
			select(noticesStore)
				.getNotices()
				.filter((notice) => notice.type === 'snackbar'),
		[]
	);
	const { removeNotice } = useDispatch(noticesStore);
	return (
		<SnackbarList
			className="edit-site-notices"
			notices={notices}
			onRemove={removeNotice}
		/>
	);
};

const handlePageLoad = () => {
	const location = useLocation();
	const routeContents = document.querySelector('.hgwp-app-body-inner');
	useEffect(() => {
		setActiveSubnav(location.pathname);
		window.scrollTo(0, 0);
		if (routeContents) {
			routeContents.focus({ preventScroll: true });
		}
	}, [location.pathname]);
};

const AppBody = (props) => {
	const location = useLocation();
	const hashedPath = '#' + location.pathname;
	const { booted, hasError } = useContext(AppStore);

	handlePageLoad();

	return (
		<main
			id="hgwp-app-rendered"
			className={classnames(
				'wpadmin-brand-hostgator',
				`hgwp-wp-${HGWP.wpversion}`,
				`hgwp-page-${ kebabCase( location.pathname ) }`,
				props.className,
				'yst-w-full yst-p-4 min-[783px]:yst-p-0'
			)}
		>
			<NewfoldNotifications
				constants={{
					context: 'hostgator-plugin',
					page: hashedPath,
					resturl: window.HGWP.resturl
				}}
				methods={{
					apiFetch,
					classnames,
					filter,
					useState,
					useEffect
				}}
			/>
			<div className="hgwp-app-body">
				<div className="hgwp-app-body-inner">
					<ErrorBoundary FallbackComponent={<ErrorCard />}>
						{hasError && <ErrorCard error={hasError} />}
						{(true === booted && <AppRoutes />) ||
							(!hasError && <Spinner />)}
					</ErrorBoundary>
				</div>
			</div>

			<div className="hgwp-app-snackbar">
				<Notices />
			</div>
		</main>
	);
};

export const App = () => (
	<AppStoreProvider>
		<Root context={{ isRtl: false }}>
			<NotificationFeed>
				<Router>
					<div className="hgwp-app-container min-[783px]:yst-p-8 min-[783px]:yst-flex yst-gap-6 yst-max-w-full xl:yst-max-w-screen-xl 2xl:yst-max-w-screen-2xl yst-my-0">
						<AppNav />
						<AppBody />
					</div>
				</Router>
			</NotificationFeed>
		</Root>
	</AppStoreProvider>
);

export default App;
