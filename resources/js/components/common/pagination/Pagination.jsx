import { useEffect, useState } from 'react';
import {default as BPagination} from 'react-bootstrap/Pagination';

const Pagination = ({meta: {last_page, current_page, total}, fetchPage}) => {


    const renderPageItems = () => {

        let pageItemToRender = last_page > 5 ? 5 : last_page;
        return (
            <>
            <BPagination.Prev 
                disabled={current_page == 1}
                onClick={() => fetchPage(current_page-1)}
            />
            {[...Array(last_page)].map((e, i) => {
                let pnumber = i +1;
                return (
                    <BPagination.Item 
                        key={pnumber} 
                        active={pnumber == current_page}
                        onClick={() => fetchPage(pnumber)}
                    >
                        {pnumber}
                    </BPagination.Item>
                ) 
            })}
            
            <BPagination.Next 
                disabled={last_page == current_page}
                onClick={() => fetchPage(current_page+1)}
            />
            </>
        )
    }

    
  return (
    <BPagination>
        {last_page > 1 && renderPageItems()}
    </BPagination>
  )
}

export default Pagination