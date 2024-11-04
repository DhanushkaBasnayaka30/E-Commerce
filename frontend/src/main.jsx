import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvide from "./context/ShopContext.jsx";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	'https://tutjsnlbzyrnobycqicd.supabase.co',
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1dGpzbmxienlybm9ieWNxaWNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA2NTQwNjcsImV4cCI6MjA0NjIzMDA2N30.rT4dx2XkRpPoRr_bqxKgRkQpaC3xJcQIiNkj0PlZK_E"
);

createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<SessionContextProvider supabaseClient={supabase}>
			<ShopContextProvide>
				<App />
			</ShopContextProvide>
		</SessionContextProvider>
	</BrowserRouter>
);
