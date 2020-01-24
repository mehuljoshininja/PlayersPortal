import React from 'react';
import { NavLink, NavItem, Input } from 'reactstrap';
import Button from 'reactstrap/lib/Button';

export default function pagination({ playersPerPage, totalPlayer, currentPage, paginate }) {
    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(totalPlayer / playersPerPage); i++) {
        if (currentPage !== i) {
            pageNumber.push(i)
        }
    }

    function goToPage() {
        const pagenumber = parseInt(document.getElementById('page-number').value)
        if (pagenumber > Math.ceil(totalPlayer / playersPerPage) || pagenumber < 1) {
            alert('Page Number Must In Between Of 1 To ' + Math.ceil(totalPlayer / playersPerPage))
        } else {
            if (pagenumber !== currentPage)
                paginate(pagenumber)
            else {
                return
            }
        }
    }

    return (
        <NavLink className='pagination'>
            {(currentPage === 1)
                ? ''
                :
                <>
                    <NavItem className='page-item'>
                        <span onClick={() => paginate(1)} className='page-link'>{'<<'}</span>
                    </NavItem>

                    <NavItem className='page-item'>
                        <span onClick={() => paginate(currentPage - 1)} href='#' className='page-link'>{'<'}</span>
                    </NavItem>
                </>
            }
            {
                pageNumber.map((number) => (
                    <NavItem className='page-item'>
                        <span onClick={() => paginate(number)} href='#' className='page-link'>
                            {number}
                        </span>
                    </NavItem>
                ))
            }
            {(currentPage === Math.ceil(totalPlayer / playersPerPage))
                ? ''
                :
                <>
                    <NavItem className='page-item'>
                        <span onClick={() => paginate(currentPage + 1)} href='#' className='page-link'>{'>'}</span>
                    </NavItem>
                    <NavItem className='page-item'>
                        <span onClick={() => paginate(Math.ceil(totalPlayer / playersPerPage))} href='#' className='page-link'>{'>>'}</span>
                    </NavItem>
                </>
            }
            &nbsp;
           <NavItem className='page-item'>
                <Input type='number' min='1' max={Math.ceil(totalPlayer / playersPerPage)} className='page-link' id='page-number' style={{ width: '70px', height: '36px' }} />
            </NavItem>
            &nbsp;
           <NavItem className='page-item'>
                <Button onClick={goToPage} className='page-link' style={{ width: '50px', height: '36px' }} >Go</Button>
            </NavItem>
        </NavLink>
    )
} 