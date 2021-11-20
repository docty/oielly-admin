import { Link } from 'react-router-dom';
import { ITable } from '../interface';

const Table = (props: ITable) => {
    
    return (
        <div className='table-responsive mb-4'>
            <table
                className='table table-centered datatable dt-responsive nowrap table-card-list'
                style={{
                    borderCollapse: 'collapse',
                    borderSpacing: '0 12px',
                    width: '100%',
                }}
            >
                <thead>
                    <tr className='bg-transparent'>
                        <th>SN</th>
                        {props.heading.map((item, index: number) => (
                            <th key={index}>{item}</th>
                        ))}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((item, index: number) => {
                        return (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                {Object.values(item).slice(2).map((value: any, index: number) => (
                                    <td key={index}>{value}</td>
                                ))}
                                {
                                    <td>
                                        {
                                            props.onItemClick ?
                                            <i onClick={() => props.onItemClick!(item.referenceId)} className='uil uil-subject font-size-18'></i>: 
                                            <Link 
                                                to={`${props.url}/${props.type}/${item.referenceId}`}
                                                className='px-1 text-success'
                                                data-toggle='tooltip'
                                                data-placement='top'
                                                title='Profile'
                                            >
                                                <i className='uil uil-subject font-size-18'></i>
                                            </Link>
                                        }
                                        
                                        {
                                            !props.noEdit && (
                                                <Link
                                                    to={`${props.url}/${props.type}/${item.referenceId}/edit`}
                                                    className='px-1 text-primary'
                                                    data-toggle='tooltip'
                                                    data-placement='top'
                                                    title='Edit'
                                                >
                                                    <i className='uil uil-pen font-size-18'></i>
                                                </Link>
                                            )
                                        }
                                        <Link
                                            to={'#'}
                                            className='px-1 text-danger'
                                            data-toggle='tooltip'
                                            data-placement='top'
                                            title='Delete'
                                        >
                                            <i className='uil uil-trash-alt font-size-18'></i>
                                        </Link>
                                    </td>
                                }
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Table;

