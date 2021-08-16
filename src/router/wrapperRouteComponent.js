import React, { memo } from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from './pravateRoute';
import { Helmet } from "react-helmet";
import config from '@/config';

const WrapperRouteComponent = ({ title, auth, ...props }) => {
    const WitchRoute = auth ? PrivateRoute : Route;
    return (
        <span>
            {title &&
                <Helmet>
                    <title>{title}-{config.title}</title>
                    <meta name="description" content={`${title}-${config.title}-description`} />
                </Helmet>
            }
            <WitchRoute  {...props} />
        </span>
    );
};

export default memo(WrapperRouteComponent);
