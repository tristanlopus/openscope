import $ from 'jquery';
import StripViewCollection from './StripViewCollection';
import StripViewModel from './StripViewModel';
import { SELECTORS } from '../../constants/selectors';

/**
 *
 *
 * @class StripViewController
 */
export default class StripViewController {
    /**
     * @constructor
     */
    constructor() {
        this._collection = null;

        this.$strips = $(SELECTORS.DOM_SELECTORS.STRIPS);

        return this._init();
    }

    /**
     *
     *
     * @for StripViewController
     * @method _init
     */
    _init() {
        this._collection = new StripViewCollection();
    }

    /**
     *
     *
     * @for StripViewController
     * @method reset
     */
    reset() {
        this._collection = null;
    }

    /**
     *
     *
     * @for StripViewController
     * @method update
     * @param aircraftList {array<AircraftInstanceModel>}
     */
    update(aircraftList) {
        for (let i = 0; i < aircraftList.length; i++) {
            const aircraftModel = aircraftList[i];

            if (aircraftModel.inside_ctr) {
                const stripViewModel = this._collection.findByAircraftId(aircraftModel.id);

                stripViewModel.update(aircraftModel);
            }
        }
    }

    /**
     *
     *
     * @for StripViewController
     * @method createStripView
     * @param aircraftModel {AircraftInstanceModel}
     */
    createStripView(aircraftModel) {
        const stripViewModel = new StripViewModel(aircraftModel);

        this._collection.addItem(stripViewModel);

        this.showStripView(stripViewModel);
    }

    /**
     *
     *
     * @method showStripView
     */
    showStripView(stripViewModel) {
        const scrollPosition = this.$strips.scrollTop();

        this.$strips.prepend(stripViewModel.$element);
        // shift scroll down one strip's height
        this.$strips.scrollTop(scrollPosition + StripViewModel.HEIGHT);
    }

    /**
     * Find as `StripViewModel` and attempt to add an active state
     *
     * @for StripViewController
     * @method selectStripView
     * @param  aircraftModel {AircraftInstanceModel}
     */
    selectStripView(aircraftModel) {
        console.log('selectStripView', aircraftModel.id, aircraftModel.callsign);
        const stripModel = this._collection.findByAircraftId(aircraftModel.id);

        if (!stripModel) {
            throw Error(`No StripModel found for selected Aircraft: ${aircraftModel.callsign}`);
        }

        stripModel.addActiveState();
    }

    /**
     * Find as `StripViewModel` and attempt to remove an active state
     *
     * @for StripViewController
     * @method deselectStripView
     * @param  aircraftModel {AircraftInstanceModel}
     */
    deselectStripView(aircraftModel) {
        const stripModel = this._collection.findByAircraftId(aircraftModel.id);

        if (!stripModel) {
            throw Error(`No StripModel found for selected Aircraft: ${aircraftModel.callsign}`);
        }

        stripModel.removeActiveState();
    }

    /**
     *
     *
     * @for StripViewController
     * @method removeStripView
     * @param aircraftModel {AircraftInstanceModel}
     */
    removeStripView(aircraftModel) {
        console.log('removeStripView', aircraftModel.id, aircraftModel.callsign);
    }
}