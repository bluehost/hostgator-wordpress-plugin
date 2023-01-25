import AppStore from '../../data/store';
import { Heading, ErrorCard } from '../../components';
import {
	hostgatorSettingsApiFetch,
	dispatchUpdateSnackbar,
} from '../../util/helpers';
import {
	Card,
	CardBody,
	CardHeader,
	SelectControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { useUpdateEffect } from 'react-use';

const ContentSettings = () => {
	const { store, setStore } = useContext(AppStore);
	const [contentRevisions, setNumContentRevisions] = useState(
		store.contentRevisions
	);
	const [emptyTrashDays, setNumEmptyTrashDays] = useState(
		store.emptyTrashDays
	);
	let numTrashWeeks = Math.floor(emptyTrashDays / 7);
	const [isError, setError] = useState(false);

	const contentRevisionsLabelText = () => {
		// `Keep ${contentRevisions} latest revision(s)`
		return (
			<span>
				{__('Keep ', 'wp-plugin-hostgator')}
				<strong>{contentRevisions}</strong>
				{_n(
					' latest revision',
					' latest revisions',
					parseInt(contentRevisions),
					'wp-plugin-hostgator'
				)}
			</span>
		);
	};
	const contentRevisionsHelpText = () => {
		//`Posts will save ${contentRevisions} revisions.`
		return (
			<span>
				{__('Posts will save ', 'wp-plugin-hostgator')}
				<strong>{contentRevisions}</strong>
				{_n(
					' revision.',
					' revisions.',
					parseInt(contentRevisions),
					'wp-plugin-hostgator'
				)}
			</span>
		);
	};
	const contentRevisionsNoticeText = () => {
		return __('Post revision setting saved', 'wp-plugin-hostgator');
	};
	const emptyTrashDaysLabelText = () => {
		// `Empty trash every ${numTrashWeeks} week(s).`
		return (
			<span>
				{__('Empty trash every ', 'wp-plugin-hostgator')}
				<strong>{numTrashWeeks}</strong>
				{_n(' week.', ' weeks.', numTrashWeeks, 'wp-plugin-hostgator')}
			</span>
		);
	};
	const emptyTrashDaysHelpText = () => {
		//`The trash will automatically empty every ${numTrashWeeks} week(s).`
		return (
			<span>
				{__(
					'The trash will automatically empty every ',
					'wp-plugin-hostgator'
				)}
				<strong>{numTrashWeeks}</strong>
				{_n(' week.', ' weeks.', numTrashWeeks, 'wp-plugin-hostgator')}
			</span>
		);
	};
	const emptyTrashDaysNoticeText = () => {
		return __('Trash setting saved', 'wp-plugin-hostgator');
	};

	useUpdateEffect(() => {
		hostgatorSettingsApiFetch(
			{ contentRevisions },
			setError,
			(response) => {
				setStore({
					...store,
					contentRevisions,
				});
				dispatchUpdateSnackbar(contentRevisionsNoticeText());
			}
		);
	}, [contentRevisions]);

	useUpdateEffect(() => {
		numTrashWeeks = Math.floor(emptyTrashDays / 7);
		hostgatorSettingsApiFetch({ emptyTrashDays }, setError, (response) => {
			setStore({
				...store,
				emptyTrashDays,
			});
			dispatchUpdateSnackbar(emptyTrashDaysNoticeText());
		});
	}, [emptyTrashDays]);

	if (isError) {
		return <ErrorCard error={isError} />;
	}
	return (
		<Card className="card-content-settings">
			<CardHeader>
				<Heading level="3">
					{__('Content Options', 'wp-plugin-hostgator')}
				</Heading>
			</CardHeader>
			<CardBody>
				{__(
					'Controls for content revisions and how often to empty the trash.',
					'wp-plugin-hostgator'
				)}
			</CardBody>
			<CardBody className="content-revisions-setting">
				<SelectControl
					label={contentRevisionsLabelText()}
					className="content-revisions-select"
					value={contentRevisions}
					help={contentRevisionsHelpText()}
					options={[
						{ label: '1', value: '1' },
						{ label: '5', value: '5' },
						{ label: '10', value: '10' },
						{ label: '20', value: '20' },
						{ label: '40', value: '40' },
					]}
					onChange={(value) => setNumContentRevisions(value)}
				/>
			</CardBody>

			<CardBody className="empty-trash-setting">
				<SelectControl
					label={emptyTrashDaysLabelText()}
					className="empty-trash-select"
					value={emptyTrashDays}
					help={emptyTrashDaysHelpText()}
					options={[
						{ label: '1', value: '7' },
						{ label: '2', value: '14' },
						{ label: '3', value: '21' },
						{ label: '4', value: '30' },
					]}
					onChange={(value) => setNumEmptyTrashDays(value)}
				/>
			</CardBody>
		</Card>
	);
};

export default ContentSettings;
