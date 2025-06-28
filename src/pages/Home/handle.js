import {
    createExercise, deleteExercise,
    getAllCourses,
    getAllExercises,
    getAllLessons,
    getAllSkills,
    getAllTopics
} from "@/api/data/index.js";
import React, {useEffect, useState} from "react";
import {
    CHOICE_TYPES,
    EXERCISE_TYPES,
    OPTION_PROMPT_TYPE_LISTEN,
    PROMPT_EXERCISE_LISTEN_TYPES,
    PROMPT_EXERCISE_TYPES
} from "@/utils/constants.js";
import _ from 'lodash'
import {Button, message, Space, Tooltip, Upload} from "antd";
import styles from './styles.module.scss'
import Delete from "@/assets/images/icons/solid/trash.svg";
import InlineSVG from "react-inlinesvg";
import {getNotification} from "@/utils/helper.js";

export default function Handle() {
    const [courseId, setCourseId] = useState(null)
    const [skills, setSkills] = useState([])
    const [loadingSkill, setLoadingSkill] = useState(false)
    const [selectSkill, setSelectSkill] = useState(null)
    const [lessons, setLessons] = useState([])
    const [loadingLesson, setLoadingLesson] = useState(false)
    const [selectLesson, setSelectLesson] = useState(null)
    const [exercises, setExercises] = useState([])
    const [loadingExercise, setLoadingExercise] = useState(false)
    const [topics, setTopics] = useState([])
    const columns = [
        {
            title: 'Loại câu hỏi',
            dataIndex: 'type',
            key: 'type',
            render: (_, record) => (
                <div>{record.type}</div>
            ),
        },
        {
            title: 'Câu hỏi',
            dataIndex: 'prompt',
            key: 'prompt',
            render: (_, record) => (
                <div>
                    <div>{record?.prompt?.value}</div>
                    {
                        record?.prompt.type === PROMPT_EXERCISE_TYPES.IMAGE ||
                        record?.prompt.type === PROMPT_EXERCISE_TYPES.AUDIO ?
                            <div>
                                {
                                    record?.prompt.type === PROMPT_EXERCISE_TYPES.IMAGE ?
                                        <img style={{width: '60px', height: '60px'}} src={record?.prompt?.path} alt=""/> :
                                        <audio controls>
                                            <source src={record?.prompt?.path} type="audio/ogg" />
                                            <source src={record?.prompt?.path} type="audio/mpeg" />
                                        </audio>
                                }
                            </div> : ''
                    }
                </div>
            ),
        },
        {
            title: 'Đáp án',
            dataIndex: 'choices',
            key: 'choices',
            render: (_, record) => (
                <>
                    {
                        record?.choices && record.choices.length > 0 &&
                        <div>
                            {
                                record.choices.map((choice, index) => {
                                    return(
                                        <div key={index}>
                                            {
                                                typeof choice === 'object' && choice !== null ?
                                                    <div>
                                                        {
                                                            choice.type === CHOICE_TYPES.IMAGE ?
                                                                <div style={{marginBottom: '15px'}}>
                                                                    <div>Đáp án của hình ảnh: {choice.value}</div>
                                                                    <img style={{width: '60px', height: '60px'}} src={choice.path} alt=""/>
                                                                </div> :
                                                                <div style={{marginBottom: '15px'}}>
                                                                    <div>Đáp án của audio: {choice.value}</div>
                                                                    <audio controls>
                                                                        <source src={choice.path} type="audio/ogg" />
                                                                        <source src={choice.path} type="audio/mpeg" />
                                                                    </audio>
                                                                </div>
                                                        }
                                                    </div> :
                                                    <div>{choice}</div>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                </>
            ),
        },
        {
            title: 'Kết quả',
            key: 'correct_answers',
            dataIndex: 'correct_answers',
            render: (_, record) => (
                <>
                    {
                        record?.correct_answers && record.correct_answers.length > 0 &&
                        <div>
                            {
                                record.correct_answers.map((correct_answer, index) => {
                                    return(
                                        <div key={index}>
                                            {
                                                record.prompt.type !== PROMPT_EXERCISE_TYPES.CONNECT_WORD ?
                                                    <div>{correct_answer}</div>:
                                                    <div>
                                                        <span>{correct_answer.en} - {correct_answer.vi} </span>
                                                    </div>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                </>
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            align: 'center',
            render: (text, record) => (
                <Space size="middle">
                    <Tooltip placement="top" title="Xóa bài tập">
                        <Button
                            className={styles.btnDelete}
                            onClick={() => handleDeleteExercise(record._id)}
                        >
                            <InlineSVG src={Delete} width={14}/>
                        </Button>
                    </Tooltip>
                </Space>
            ),
        },
    ];
    const [visibleCreateExercise, setVisibleCreateExercise] = useState(false);
    const [formExercise, setFormExercise] = useState({
        type: EXERCISE_TYPES.SINGLE_CHOICE,
        prompt: {
            type: PROMPT_EXERCISE_TYPES.TEXT,
            value: ''
        },
        choices: [],
        choice_type: CHOICE_TYPES.TEXT,
        correct_answers: [],
    });
    const [loadingCreateExercise, setLoadingCreateExercise] = useState(false)
    const propsCreateFile = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        accept: '.png,.jpg,.jpeg,.gif,.bmp,.webp',
        showUploadList: true,
        beforeUpload: (file) => {
            const acceptedTypes = [
                'image/png',
                'image/jpeg',
                'image/gif',
                'image/bmp',
                'image/webp',
            ];

            const isAccept = acceptedTypes.includes(file.type);
            if (!isAccept) {
                message.error('Chỉ cho phép upload file ảnh hoặc âm thanh!');
                return Upload.LIST_IGNORE;
            }

            message.success(`${file.name} file uploaded successfully.`);

            handleChangePromptData('file', file)
            return false;
        },
        onRemove() {
            handleChangePromptData('file', null)
            message.success(`Remove file successfully.`);
        },
    };

    const [visibleCreateSkill, setVisibleCreateSkill] = useState(false);
    const [visibleCreateLesson, setVisibleCreateLesson] = useState(false);
    const [paginationConfig, setPaginationConfig] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} bài`,
        pageSizeOptions: ['10', '20', '50', '100'],
    })

    useEffect(() => {
        handleGetAllTopics()
        handleGetAllCourse()
    }, [])

    const handleGetAllCourse = () => {
        getAllCourses().then((res) => {
            let firstCourse
            if (res.data.data.length > 0) {
                firstCourse = res.data.data[0]
                handleGetALLSkill(firstCourse._id)
                setCourseId(firstCourse._id)
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleGetAllTopics = () => {
        getAllTopics().then((res) => {
            setTopics(res.data.data)
        }).catch(() => {
            setTopics([])
        })
    }

    const handleGetALLSkill = (course_id) => {
        setLoadingSkill(true)
        setLessons([])
        setSelectLesson(null)
        getAllSkills(course_id).then((res) => {
            setSkills(res.data.data)
            let firstSkill
            if (res.data.data.length > 0) {
                firstSkill = res.data.data[0]
                setSelectSkill(firstSkill._id)
                handleGetAllLesson(firstSkill._id)
            }
        }).catch(() => {
            setSelectSkill(null)
            setSkills([])
        }).finally(() => {
            setLoadingSkill(false)
        })
    }

    const handleGetAllLesson = (skill_id) => {
        setLoadingLesson(true)
        setExercises([])
        getAllLessons(skill_id).then((res) => {
            setLessons(res.data.data)
            let firstLesson
            if (res.data.data.length > 0) {
                firstLesson = res.data.data[0]
                setSelectLesson(firstLesson._id)
                handleGetExercises(firstLesson._id)
            } else {
                setSelectLesson(null)
            }
        }).catch(() => {
            setLessons([])
            setSelectLesson(null)
        }).finally(() => {
            setLoadingLesson(false)
        })
    }

    const handleGetExercises = (lesson_id, dataFilter= {
        perPage: 10,
        page: 1
    }) => {
        setLoadingExercise(true)
        getAllExercises(lesson_id, dataFilter).then((res) => {
            setExercises(res.data.data.exercises)
            setPaginationConfig({
                ...paginationConfig,
                current: res.data.data.page,
                pageSize: res.data.data.per_page,
                total: res.data.data.total,
            })
        }).catch(() => {
            setExercises([])
        }).finally(() => {
            setLoadingExercise(false)
        })
    }

    const onChangeSkill = value => {
        setSelectSkill(value)
        handleGetAllLesson(value)
    };

    const onChangeLesson = value => {
        setSelectLesson(value)
        handleGetExercises(value)
    };

    const handleChangeSelect = (type, value) => {
        let newFormExercise = _.cloneDeep(formExercise);
        newFormExercise[type] = value;

        switch (type) {
            case 'type':
                newFormExercise.prompt = {
                    type: value !== EXERCISE_TYPES.LISTEN ? PROMPT_EXERCISE_TYPES.TEXT : PROMPT_EXERCISE_TYPES.AUDIO,
                    value: value === EXERCISE_TYPES.LISTEN ?
                        OPTION_PROMPT_TYPE_LISTEN.find(item => item.value === PROMPT_EXERCISE_LISTEN_TYPES.ENTER_INPUT).label :
                        '',
                    ...(value === EXERCISE_TYPES.LISTEN && {type_answer: PROMPT_EXERCISE_LISTEN_TYPES.ENTER_INPUT})
                }
                newFormExercise.choices = []
                newFormExercise.choice_type = CHOICE_TYPES.TEXT
                newFormExercise.correct_answers = []
                break
            case 'choices':
                newFormExercise.correct_answers = [];
                break
            case 'choice_type':
                if (value === CHOICE_TYPES.IMAGE) {
                    newFormExercise.choices = [
                        {
                            file: null,
                            imageUrl: '',
                            text: ''
                        }
                    ]
                } else {
                    newFormExercise.choices = []
                }
                newFormExercise.correct_answers = []
                break
        }

        setFormExercise(newFormExercise);
    }

    const handleChangeImageChoices  = (index, choose, type) => {
        let newFormExercise = _.cloneDeep(formExercise);
        if (type === 'file') {
            newFormExercise.choices[index].file = choose.file
            newFormExercise.choices[index].imageUrl = choose.imageUrl
        } else {
            newFormExercise.choices[index].text = choose.text
        }
        setFormExercise(newFormExercise);
    }

    const handleChangePromptData = (type, value) => {
        let newFormExercise = _.cloneDeep(formExercise)
        newFormExercise.prompt[type] = value
        if (
            value === PROMPT_EXERCISE_TYPES.CONNECT_WORD ||
            newFormExercise.prompt.type === PROMPT_EXERCISE_TYPES.CONNECT_WORD
        ) {
            newFormExercise.correct_answers = [
                {en: '', vi: ''}
            ]
        } else if (type === 'type_answer') {
            newFormExercise.prompt.value = OPTION_PROMPT_TYPE_LISTEN.find(item => item.value === value).label;
            newFormExercise.correct_answers = []
        } else {
            newFormExercise.correct_answers = []
        }
        newFormExercise.choices = []
        setFormExercise(newFormExercise)
    }

    const handleChangePromptValueQuestionTypeFill = (type, value) => {
        const newValue = sanitizeBlanks(value);
        let newFormExercise = _.cloneDeep(formExercise)
        newFormExercise.prompt[type] = newValue
        setFormExercise(newFormExercise)
    }

    const sanitizeBlanks = (text) => {
        text = text.replace(/\[bl[a-z]*$/gi, '');

        text = text.replace(/(^|\s)blank\](?=\s|$)/gi, '');

        text = text.replace(/\[(?!blank\])([^\]]+)\]/gi, '');

        return text;
    };

    const handleAddTextAnswerTypeFill = () => {
        let newFormExercise = _.cloneDeep(formExercise)
        newFormExercise.prompt.value = `${newFormExercise.prompt.value} [blank]`
        setFormExercise(newFormExercise)
    }

    const handleChangeCorrectAnswersTypeMatch = (index, type, value) => {
        let newFormExercise = _.cloneDeep(formExercise)
        newFormExercise.correct_answers[index][type] = value
        setFormExercise(newFormExercise)
    }

    const handleDeleteItemAnswerTypeMatch = (index) => {
        let newFormExercise = _.cloneDeep(formExercise)
        newFormExercise.correct_answers.splice(index, 1);
        setFormExercise(newFormExercise)
    }

    const handleCreateItemAnswerTypeMatch = () => {
        let newFormExercise = _.cloneDeep(formExercise)
        newFormExercise.correct_answers.push({en: '', vi: ''});
        setFormExercise(newFormExercise)
    }

    const handleCreateExercise = () => {
        const formData = new FormData()

        formData.append('type', formExercise.type)
        formData.append('choice_type', formExercise.choice_type)
        formData.append('prompt', JSON.stringify(formExercise.prompt))
        if (formExercise.choice_type === CHOICE_TYPES.IMAGE) {
            const choices = []
            formExercise.choices.forEach((choose) => {
                choices.push(choose.text)
                formData.append(`choose_files`, choose.file);
            });
            formData.append('choices', JSON.stringify(choices))
        } else {
            formData.append('choices', JSON.stringify(formExercise.choices))
        }

        if (formExercise.type === EXERCISE_TYPES.SINGLE_CHOICE) {
            formData.append('correct_answers', JSON.stringify([formExercise.correct_answers]))
        } else {
            formData.append('correct_answers', JSON.stringify(formExercise.correct_answers))
        }
        if (formExercise.prompt.type === PROMPT_EXERCISE_TYPES.IMAGE) {
            formData.append('file_prompt', formExercise.prompt.file)
        }

        console.log(formExercise)

        setLoadingCreateExercise(true)
        createExercise(selectLesson, formData).then(() => {
            setFormExercise({
                type: EXERCISE_TYPES.SINGLE_CHOICE,
                prompt: {
                    type: PROMPT_EXERCISE_TYPES.TEXT,
                    value: ''
                },
                choices: [],
                choice_type: CHOICE_TYPES.TEXT,
                correct_answers: [],
            });

            setVisibleCreateExercise(false)
            handleGetExercises(selectLesson)
            getNotification('success', 'Tạo bài học thành công.')
        }).catch((error) => {
            console.log(error)
        }).finally(() => setLoadingCreateExercise(false))
    }

    const handleSuccessCreateSkill = () => {
        setVisibleCreateSkill(false)
        handleGetALLSkill(courseId)
    }

    const handleSuccessCreateLesson = () => {
        setVisibleCreateLesson(false)
        handleGetAllLesson(selectSkill)
    }

    const handleChangePagination = (pagination) => {
        handleGetExercises(selectLesson, {
            perPage: 10,
            page: pagination.current
        })
    }

    const handleDeleteExercise = (exercise_id) => {
        deleteExercise(exercise_id).then(() => {
            handleGetExercises(selectLesson)
            getNotification('success', 'Xóa thành công')
        }).catch(() => {

            getNotification('error', 'Có lỗi xảy ra')
        })
    }

    const handleDeleteItemChooseImage = (index) => {
        let newFormExercise = _.cloneDeep(formExercise)
        newFormExercise.choices.splice(index, 1);
        setFormExercise(newFormExercise)
    }

    const handleCreateItemChooseImage = () => {
        let newFormExercise = _.cloneDeep(formExercise)
        newFormExercise.choices.push({
            file: null,
            imageUrl: '',
            text: ''
        });
        setFormExercise(newFormExercise)
    }

    return {
        courseId, columns, skills, lessons, selectSkill, selectLesson, exercises, formExercise, topics,
        loadingSkill, loadingLesson, loadingExercise, paginationConfig, loadingCreateExercise,
        visibleCreateExercise, setVisibleCreateExercise, propsCreateFile,
        visibleCreateSkill, setVisibleCreateSkill,
        visibleCreateLesson, setVisibleCreateLesson,
        onChangeSkill, onChangeLesson,
        handleChangeSelect, handleChangePromptData, handleCreateExercise,
        handleChangeCorrectAnswersTypeMatch, handleDeleteItemAnswerTypeMatch, handleCreateItemAnswerTypeMatch,
        handleSuccessCreateSkill, handleSuccessCreateLesson, handleChangePagination,
        handleAddTextAnswerTypeFill, handleChangePromptValueQuestionTypeFill, handleChangeImageChoices,
        handleCreateItemChooseImage, handleDeleteItemChooseImage
    }
}
