import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
const Layout = () => {
            return (
                        <div className=''>
                                    <Navbar />
                                    <main className='p-4 min-h-[91vh] '>
                                                <Outlet />
                                    </main>
                        </div>
            )
}

export default Layout   