import React, { useState, useEffect } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import $ from 'jquery'

function Sidebar() {

    const ulStyle = {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
    };

    const liStyle = {
        padding: '0.5rem 1rem',
        backgroundColor: '#333',
        borderRadius: '0.25rem',
        marginBottom: '0.25rem',
        marginLeft: '0rem',
        transition: 'background-color 0.3s ease',
    };

    const liHoverStyle = {
        backgroundColor: '#555',
    };

    const linkStyle = {
        textDecoration: 'none',
        color: '#fff',
        display: 'block',
    };


    const handleMouseOver = (event) => {
        event.currentTarget.style.backgroundColor = liHoverStyle.backgroundColor;
    };

    const handleMouseOut = (event) => {
        event.currentTarget.style.backgroundColor = liStyle.backgroundColor;
    };
    const [data, setData] = useState([])

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => {
                setData(json)
            })
            .catch(error => {
                alert("something wen't wrong for getting product data...")
                console.log(error)
            })

        console.log(data);
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').toggleClass('active');
        });

        return () => {
            $('#sidebarCollapse').off('click');
        }

    }, [])

    return (
        <div className="wrapper h-100">
            <nav id="sidebar">
                <div className="sidebar-header text-center">
                    <h3>Products</h3>
                    All products
                </div>

                <ul
                    style={{
                        height: '80vh',          // Full viewport height
                        overflowY: 'auto',        // Enable vertical scrolling
                        padding: '20px',
                        boxSizing: 'border-box',
                    }}
                >
                    {data.map(d => (
                        <li
                            key={d.id}
                            style={liStyle}
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}
                        >
                            <Link
                                style={linkStyle}
                                to={`product/${d.id}`}
                            >
                                {d.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* <!-- Page Content  --> */}
            <div id="content">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">

                        <button type="button" id="sidebarCollapse" className="btn btn-info">
                            <i className="fas fa-align-left"></i>
                            <span >Toggle Sidebar</span>
                        </button>
                        <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <i className="fas fa-align-justify"></i>
                        </button>
                    </div>
                    <div>
                        <NavLink className="text-decoration-none p-3 border-2" to={'/'}>New</NavLink>
                    </div>
                </nav>

                <div id='showproduct' className='p-2 card border-3' >
                    <Outlet />
                </div>
            </div>
        </div >
    )
}

export default Sidebar
