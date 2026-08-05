import { useMemo, useState } from "react";
import {
    Search,
    Pencil,
    Trash2,
    BookOpen,
} from "lucide-react";


function QuestionTable({

    questions = [],

    onEdit,

    onDelete,

}) {


    const [search, setSearch] = useState("");


    const filteredQuestions = useMemo(() => {


        const value = search
            .trim()
            .toLowerCase();


        if (!value) {

            return questions;

        }


        return questions.filter((question) => {


            const questionText =
                question.question
                    ?.toLowerCase() || "";


            const subject =
                typeof question.subject === "object"
                    ? question.subject?.name
                    : question.subject;


            const difficulty =
                question.difficulty
                    ?.toLowerCase() || "";


            return (

                questionText.includes(value) ||

                subject
                    ?.toLowerCase()
                    .includes(value) ||

                difficulty.includes(value)

            );


        });


    }, [questions, search]);



    return (


        <div

            className="rounded-4 overflow-hidden"

            style={{

                background:"#131D31",

                border:
                    "1px solid rgba(255,255,255,.08)"

            }}

        >


            {/* Header */}

            <div

                className="p-4 d-flex justify-content-between align-items-center flex-wrap gap-3"

                style={{

                    borderBottom:
                        "1px solid rgba(255,255,255,.08)"

                }}

            >


                <div className="d-flex align-items-center gap-3">


                    <div

                        className="rounded-circle d-flex align-items-center justify-content-center"

                        style={{

                            width:48,

                            height:48,

                            background:
                                "rgba(37,99,235,.15)"

                        }}

                    >

                        <BookOpen

                            size={24}

                            color="#60A5FA"

                        />

                    </div>



                    <div>


                        <h4

                            className="text-white fw-bold mb-1"

                        >

                            Question Bank

                        </h4>


                        <p

                            className="text-secondary mb-0"

                        >

                            Manage all questions from one place.

                        </p>


                    </div>


                </div>




                <div

                    className="position-relative"

                    style={{

                        width:"300px"

                    }}

                >


                    <Search

                        size={18}

                        className="position-absolute"

                        style={{

                            left:"14px",

                            top:"50%",

                            transform:
                                "translateY(-50%)",

                            color:"#94A3B8"

                        }}

                    />


                    <input

                        type="text"

                        className="form-control ps-5"

                        placeholder="Search questions..."

                        value={search}

                        onChange={(e)=>

                            setSearch(e.target.value)

                        }


                        style={{

                            background:"#0F172A",

                            color:"#fff",

                            border:
                                "1px solid rgba(255,255,255,.1)"

                        }}

                    />


                </div>


            </div>




            {/* Questions */}


            <div className="p-3">


                {

                    filteredQuestions.length === 0 ? (


                        <div

                            className="text-center py-5"

                        >

                            <h5

                                className="text-white"

                            >

                                No questions found

                            </h5>


                            <p

                                className="text-secondary"

                            >

                                Try changing your search.

                            </p>


                        </div>


                    ) : (


                        filteredQuestions.map(

                            (question,index)=>(


                                <div


                                    key={question._id}


                                    className="mb-3 rounded-4 p-4"


                                    style={{


                                        background:"#0F172A",


                                        border:

                                            "1px solid rgba(255,255,255,.08)",


                                        transition:
                                            "0.25s ease"


                                    }}



                                >



                                    <div

                                        className="d-flex justify-content-between gap-3"

                                    >



                                        <div

                                            className="flex-grow-1"

                                        >



                                            <div

                                                className="d-flex gap-3 mb-3"

                                            >


                                                <span

                                                    className="text-secondary"

                                                >

                                                    #{index+1}

                                                </span>



                                                <h6

                                                    className="text-white mb-0"

                                                    style={{

                                                        lineHeight:
                                                            "1.6"

                                                    }}

                                                >

                                                    {

                                                        question.question

                                                    }


                                                </h6>


                                            </div>




                                            <div

                                                className="d-flex flex-wrap gap-2"

                                            >



                                                <span

                                                    className="badge rounded-pill"

                                                    style={{

                                                        background:
                                                            "rgba(59,130,246,.15)",

                                                        color:
                                                            "#60A5FA"

                                                    }}

                                                >

                                                    {

                                                        typeof question.subject === "object"

                                                        ?

                                                        question.subject?.name

                                                        :

                                                        question.subject || "General"

                                                    }


                                                </span>




                                                <span

                                                    className="badge rounded-pill"

                                                    style={{

                                                        background:

                                                            question.difficulty === "Easy"

                                                            ?

                                                            "rgba(34,197,94,.15)"

                                                            :

                                                            question.difficulty === "Medium"

                                                            ?

                                                            "rgba(245,158,11,.15)"

                                                            :

                                                            "rgba(239,68,68,.15)",


                                                        color:

                                                            question.difficulty === "Easy"

                                                            ?

                                                            "#4ADE80"

                                                            :

                                                            question.difficulty === "Medium"

                                                            ?

                                                            "#FBBF24"

                                                            :

                                                            "#F87171"

                                                    }}

                                                >

                                                    {

                                                        question.difficulty

                                                    }


                                                </span>



                                            </div>


                                        </div>




                                        <div

                                            className="d-flex gap-2"

                                        >


                                            <button

                                                className="btn btn-sm"

                                                onClick={()=>

                                                    onEdit(question)

                                                }

                                                style={{


                                                    background:
                                                        "rgba(59,130,246,.15)",


                                                    color:
                                                        "#60A5FA"


                                                }}

                                            >

                                                <Pencil

                                                    size={16}

                                                />


                                            </button>




                                            <button

                                                className="btn btn-sm"

                                                onClick={()=>

                                                    onDelete(question)

                                                }

                                                style={{


                                                    background:
                                                        "rgba(239,68,68,.15)",


                                                    color:
                                                        "#F87171"


                                                }}

                                            >

                                                <Trash2

                                                    size={16}

                                                />


                                            </button>



                                        </div>



                                    </div>



                                </div>


                            )

                        )


                    )

                }


            </div>


        </div>


    );

}


export default QuestionTable;