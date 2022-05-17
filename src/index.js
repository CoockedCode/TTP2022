import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

//redux
import { Provider } from "react-redux";
import store, {persistor} from "./redux/configureStore";
import { PersistGate } from 'redux-persist/integration/react';

//lubatud lehed
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
const history = createBrowserHistory({ window });

//style
import { StyledEngineProvider } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { etEE } from '@mui/material/locale';
const theme = createTheme(etEE);

ReactDOM.createRoot(root).render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={theme}>
						<HistoryRouter history={history}>
							<App />
						</HistoryRouter>
					</ThemeProvider>
				</StyledEngineProvider>
			</PersistGate>	
		</Provider>
	</React.StrictMode>
);