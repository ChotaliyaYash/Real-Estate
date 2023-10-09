import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"

const App = () => {
    return (
        <>
            {/* Header */}
            <Header />

            {/* Main body Content */}
            <Outlet />

            {/* Footer */}
            <Footer />
        </>
    )
}

export default App