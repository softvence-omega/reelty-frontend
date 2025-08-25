import MaxWidthWrapper from "../../../components/wrappers/MaxWidthWrapper";

const CreateTeamplate = () => {

    return (
        <div className="text-white py-10">
            <MaxWidthWrapper>
                {/* Title & Info */}
                <h1 className="text-2xl font-semibold mb-2">Brand Templates</h1>
                <p className="text-sm text-gray-400 mb-6">
                    Only Pro accounts may use the Brand Kit. Upgrade now to build your
                    Brand Kit with custom fonts, intro & outro cards, B-Roll, and more.{" "}
                    <a href="#" className="text-blue-400 underline">
                        Upgrade to Pro now
                    </a>
                </p>
            </MaxWidthWrapper>
        </div>
    )
}

export default CreateTeamplate;