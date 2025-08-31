import ChoosePlan from '../../home/ChoosePlan';
import ActiveSubscription from '../../payment/ActiveSubscription';

const Subscription = () => {
    return (
        <div className="min-h-screen flex items-center justify-center  px-4">
            <div className="w-full max-w-4xl">
                <div className='mb-8'>
                    <ActiveSubscription />
                </div>
                <ChoosePlan />
            </div>
        </div>
    );
};

export default Subscription;
