import notie from 'notie';
import "notie/dist/notie.css";

notie.setOptions({
    alertTime: 5,
    dateMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    overlayClickDismiss: true,
    overlayOpacity: 0.75,
    transitionCurve: 'ease',
    transitionDuration: 0.3,
    transitionSelector: 'all',
    classes: {
        container: 'notie-container',
        textbox: 'notie-textbox',
        textboxInner: 'notie-textbox-inner',
        button: 'notie-button',
        element: 'notie-element',
        elementHalf: 'notie-element-half',
        elementThird: 'notie-element-third',
        overlay: 'notie-overlay',
        backgroundSuccess: 'notie-background-success',
        backgroundWarning: 'notie-background-warning',
        backgroundError: 'notie-background-error',
        backgroundInfo: 'notie-background-info',
        backgroundNeutral: 'notie-background-neutral',
        backgroundOverlay: 'notie-background-overlay',
        alert: 'notie-alert',
        inputField: 'notie-input-field',
        selectChoiceRepeated: 'notie-select-choice-repeated',
        dateSelectorInner: 'notie-date-selector-inner',
        dateSelectorUp: 'notie-date-selector-up'
    },
    ids: {
        overlay: 'notie-overlay'
    },
    positions: {
        alert: 'bottom',
        force: 'bottom',
        confirm: 'bottom',
        input: 'bottom',
        select: 'bottom',
        date: 'bottom'
    }
})

export const successAlert = (msg) => {
    notie.alert({
        type: 1, // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
        text: msg,
        stay: false, // optional, default = false
        position: 'bottom' // optional, default = 'top', enum: ['top', 'bottom']
    })
}

export const errorAlert = (err) => {
    notie.alert({
        type: 3, // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
        text: err,
        stay: false, // optional, default = false
        position: 'bottom' // optional, default = 'top', enum: ['top', 'bottom']
    })
}