import { Fragment, useEffect, useState } from 'react'; 
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import Spinner from '../../components/Spinner';
import Table from '../../components/Table';
import { IProductMaterial } from '../../interface';
import { PRODUCT, WALLET } from '../../utility/constant';

const Account = () => {
    return (
        <Fragment>
            <Header />
            <Sidebar />
             
                <Description /> 
        </Fragment>
    )
}

const Description = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [state, setState] = useState<IProductMaterial[]>([]);
    const tableHeader = ['Market Name', 'Deposit', 'Withdrawal', 'Balance', 'Date'];

    useEffect(() => {
        fetch(WALLET)
            .then(res => res.json())
            .then(data => { setLoading(false); setState(data); })
            .catch(err => console.error(err))
    }, []) 
 
    return (
        <>
            <Table
                heading={tableHeader}
                type={'material'}
                url={PRODUCT}
                data={state}
                noEdit
            />
            {loading && <Spinner />}
        </>
    )
}

export default Account;