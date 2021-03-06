import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { translate } from '../../../base/i18n';

/**
 * Displays a table with phone numbers to dial in to a conference.
 *
 * @extends Component
 */
class NumbersList extends Component {
    /**
     * {@code NumbersList} component's property types.
     *
     * @static
     */
    static propTypes = {
        /**
         * The phone numbers to display. Can be an array of numbers
         * or an object with countries as keys and an array of numbers
         * as values.
         */
        numbers: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object
        ]),

        /**
         * Invoked to obtain translated strings.
         */
        t: PropTypes.func
    };

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const { numbers, t } = this.props;
        const showWithoutCountries = Array.isArray(numbers);

        return (
            <table className = 'dial-in-numbers-list'>
                <thead>
                    <tr>
                        { showWithoutCountries
                            ? null
                            : <th>{ t('info.country') }</th> }
                        <th>{ t('info.numbers') }</th>
                    </tr>
                </thead>
                <tbody>
                    { showWithoutCountries
                        ? numbers.map(this._renderNumberRow)
                        : this._renderWithCountries() }
                </tbody>
            </table>);
    }

    /**
     * Renders rows of countries and associated phone numbers.
     *
     * @private
     * @returns {ReactElement[]}
     */
    _renderWithCountries() {
        const rows = [];

        for (const [ country, numbers ] of Object.entries(this.props.numbers)) {
            const formattedNumbers = numbers.map(this._renderNumberDiv);

            rows.push(
                <tr key = { country }>
                    <td>{ country }</td>
                    <td className = 'dial-in-numbers'>{ formattedNumbers }</td>
                </tr>
            );
        }

        return rows;
    }

    /**
     * Renders a table row for a phone number.
     *
     * @param {string} number - The phone number to display.
     * @private
     * @returns {ReactElement[]}
     */
    _renderNumberRow(number) {
        return (
            <tr key = { number }>
                <td className = 'dial-in-number'>
                    { number }
                </td>
            </tr>
        );
    }

    /**
     * Renders a div container for a phone number.
     *
     * @param {string} number - The phone number to display.
     * @private
     * @returns {ReactElement[]}
     */
    _renderNumberDiv(number) {
        return (
            <div
                className = 'dial-in-number'
                key = { number }>
                { number }
            </div>
        );
    }
}

export default translate(NumbersList);
