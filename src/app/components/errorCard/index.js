import './stylesheet.scss';
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	CardFooter,
	Dashicon,
	__experimentalHeading as Heading,
} from '@wordpress/components';
import {
	dispatchUpdateSnackbar,
} from '../../util/helpers';

const ErrorCard = ({ error, className, notice = 'Error!' }) => {
    dispatchUpdateSnackbar(notice);

	return (
        <Card className={classNames('error-card', className)}>
            <CardHeader>
                <Heading level="3">
                    <Dashicon icon="warning" style={{ fontSize: "24px", width: "24px", height: "24px" }} />
                    {' '}
                    {__('Oh No, An Error!', 'wp-plugin-hostgator')}
                </Heading>
            </CardHeader>
            <CardBody>
                <p>{__('You found an error, please refresh the page and try again!', 'wp-plugin-hostgator')}</p>
                <p>{__('If the error persists, please contact support.', 'wp-plugin-hostgator')}</p>
            </CardBody>
            <CardFooter>
                <p>
                    { error && error.message ? error.message : '' }
                    { error && error.data ? __(' Error code: ', 'wp-plugin-hostgator') + error.data.status : '' }
                </p>
            </CardFooter>
        </Card>
	);
};

export default ErrorCard;
