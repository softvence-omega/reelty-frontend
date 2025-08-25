import MaxWidthWrapper from "../../../components/wrappers/MaxWidthWrapper";

const CreateTeamplate = () => {

    return (
        <div className="text-white py-10">
            <MaxWidthWrapper>
               {/* title */}
                <div className="flex items-center justify-between mb-6">
                    <button>back</button>
                    <div className=" max-w-3xl py-1 px-2 rounded-3xl bg-black">Template 1</div>
                    <button>
                        Save Template
                    </button>
                </div>
                <div className="flex gap-6 ">

                </div>
             
            </MaxWidthWrapper>
        </div>
    )
}

export default CreateTeamplate;