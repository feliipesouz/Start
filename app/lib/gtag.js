export const GA_TRACKING_ID = "G-LB9WMNE0WD"; // Substitua pelo seu ID do Google Analytics

// Envia um evento de página visualizada
export const pageview = (url) => {
    window.gtag("config", GA_TRACKING_ID, {
        page_path: url,
    });
};

// Envia eventos personalizados
export const event = ({ action, category, label, value }) => {
    window.gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
    });
};
