import { Avatar, Card, Cage, Flexbox, Breadcrumb, Heading, Grid } from '@docty68/widget';
import * as css from '../utility/styling';


const Home = () => (
    <>
        <Card className={css.cardStyling} style={{ borderRadius: 'unset' }}>
            <Flexbox alignItems={'center'} justifyContent={'between'} style={{ borderBottom: '1px solid #eee', marginBottom: '0.5rem' }}>
                <Cage>
                    <Heading type={'H3'} text={'Dashboard'} className={css.pageTitle} style={{ fontSize: '2rem' }} />
                </Cage>
        </Flexbox>

            <Breadcrumb
                items={[
                    { text: 'Dashboard', url: '/v1/dashboard' }
                ]} />
        </Card>
        <Content />
    </>
)


const Content = () => {
    return (
        <Cage className={css.contentStyling}>
            <Grid lg={'4'} gap={'3'}>
                <Card className={css.cardStyling}>
                    <Flexbox>
                        <Avatar iconSize={'50'} icon={'icon-cart5'} style={{background: 'rgb(47 149 29)'}} />
                        <div className={'mx-5'}>
                            <h6 className={'p-1 font-bold text-base'}>Orders</h6>
                            <span className={'p-1'}>554</span>
                        </div>
                    </Flexbox>
                </Card>
                <Card className={css.cardStyling}>
                    <Flexbox>
                        <Avatar iconSize={'50'} icon={'icon-store2'} style={{background: 'rgb(97 29 149)'}} />
                        <div className={'mx-5'}>
                            <h6 className={'p-1 font-bold text-base'}>Market</h6>
                            <span className={'p-1'}>27</span>
                        </div>
                    </Flexbox>
                </Card>
                <Card className={css.cardStyling}>
                    <Flexbox>
                        <Avatar iconSize={'50'} icon={'icon-store2'} style={{background: 'rgb(149 29 101)'}} />
                        <div className={'mx-5'}>
                            <h6 className={'p-1 font-bold text-base'}>Market</h6>
                            <span className={'p-1'}>27</span>
                        </div>
                    </Flexbox>
                </Card>
                <Card className={css.cardStyling}>
                    <Flexbox>
                        <Avatar iconSize={'50'} icon={'icon-store2'} className={css.avatatStyling} />
                        <div className={'mx-5'}>
                            <h6 className={'p-1 font-bold text-base'}>Market</h6>
                            <span className={'p-1'}>27</span>
                        </div>
                    </Flexbox>
                </Card>
            </Grid>
        </Cage>
    )
}

export default Home;