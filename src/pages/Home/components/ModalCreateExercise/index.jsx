import {Button, Input, Modal, Select, Tooltip, Upload} from "antd";
import {
    EXERCISE_TYPES,
    OPTION_PROMPT_TYPE_1,
    OPTION_PROMPT_TYPE_2,
    OPTION_TYPE_EXERCISE,
    PROMPT_EXERCISE_TYPES
} from "@/utils/constants.js";
import styles from "@/pages/Home/styles.module.scss";
import InputForm from "@/components/InputForm/index.jsx";
import {InboxOutlined} from "@ant-design/icons";
import React from "react";
import InlineSVG from "react-inlinesvg";
import Question from "@/assets/images/icons/solid/circle-question.svg";
import Change from "@/assets/images/icons/solid/right-left.svg";

const { Dragger } = Upload;

export default function ModalCreateExercise(props) {
    const {
        formExercise, visibleCreateExercise, propsCreateFile,
        setVisibleCreateExercise, handleChangeSelect, handleChangePromptData,
        handleCreateItemAnswerTypeMatch, handleChangeCorrectAnswersTypeMatch,
        handleDeleteItemAnswerTypeMatch, handleCreateExercise,
        handleAddTextAnswerTypeFill, handleChangeValuePromptValueQuestionTypeFill
    } = props

    return (
        <Modal
            className={`general-dialog-wrap`}
            closable={false}
            footer={false}
            open={visibleCreateExercise}
            onOk={() => setVisibleCreateExercise(!visibleCreateExercise)}
            onCancel={() => setVisibleCreateExercise(!visibleCreateExercise)}
            width={900}
        >
            <div>
                <div className={`input-wrap`}>
                    <div className={"label-wrap"}>
                        Loại bài học
                        <span className={"required"}>*</span>
                    </div>

                    <Select
                        className={`main-select`}
                        style={{ width: '100%' }}
                        placeholder="Chọn loại bài học"
                        value={formExercise.type}
                        options={OPTION_TYPE_EXERCISE.map(item => ({
                            value: item.value,
                            label: `${item.label}`,
                        }))}
                        onChange={(value) => handleChangeSelect('type', value)}
                    />
                    {/*{errorFormData.form_order && errorFormData.form_order.length > 0 ? <ErrorMessage message={errorFormData.form_order} /> : ""}*/}
                </div>

                <div className={`input-wrap ${styles.boxPromptWrap}`}>


                    <div className={styles.boxLabelWrap}>
                        <div className={"label-wrap"}>
                            Câu hỏi
                            <span className={"required"}>*</span>
                        </div>

                        {
                            formExercise.type === EXERCISE_TYPES.FILL_IN_BLANK &&
                            <>
                                <Tooltip placement="top" title={<div>Nhấn nút chèn chỗ trống để lưu vị trí đáp án đúng</div>}>
                                    <InlineSVG src={Question} width={16}/>
                                </Tooltip>

                                <button
                                    onClick={() => handleAddTextAnswerTypeFill()}
                                    className={styles.btnAddAnswer}
                                >Chèn chỗ trống
                                </button>
                            </>
                        }

                    </div>

                    {
                        formExercise.type === EXERCISE_TYPES.SINGLE_CHOICE ||
                        formExercise.type === EXERCISE_TYPES.MULTIPLE_CHOICE ?
                            <div className={styles.inputType}>
                                <Select
                                    className={`main-select`}
                                    style={{ width: '100%' }}
                                    placeholder="Chọn loại"
                                    value={formExercise.prompt.type}
                                    options={OPTION_PROMPT_TYPE_1.map(item => ({
                                        value: item.value,
                                        label: `${item.label}`,
                                    }))}
                                    onChange={(value) => handleChangePromptData('type', value)}
                                />
                            </div> : ''
                    }

                    {
                        formExercise.type === EXERCISE_TYPES.MATCH &&
                        <div className={styles.inputType}>
                            <Select
                                className={`main-select`}
                                style={{ width: '100%' }}
                                placeholder="Chọn loại"
                                value={formExercise.prompt.type}
                                options={OPTION_PROMPT_TYPE_2.map(item => ({
                                    value: item.value,
                                    label: `${item.label}`,
                                }))}
                                onChange={(value) => handleChangePromptData('type', value)}
                            />
                        </div>
                    }

                    {
                        formExercise.type === EXERCISE_TYPES.FILL_IN_BLANK ?
                            <InputForm
                                placeholder={'Nhập câu hỏi'}
                                required={false}
                                type="value"
                                value={formExercise.prompt.value}
                                handleChangeData={handleChangeValuePromptValueQuestionTypeFill}
                            /> :
                            <InputForm
                                placeholder={'Nhập câu hỏi'}
                                required={false}
                                type="value"
                                value={formExercise.prompt.value}
                                handleChangeData={handleChangePromptData}
                            />
                    }


                    {
                        formExercise.prompt.type !== PROMPT_EXERCISE_TYPES.TEXT &&
                        formExercise.prompt.type !== PROMPT_EXERCISE_TYPES.CONNECT_WORD ||
                        formExercise.type === EXERCISE_TYPES.LISTEN ?
                            <Dragger {...propsCreateFile}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                {
                                    formExercise.type === EXERCISE_TYPES.LISTEN ?
                                        <p className="ant-upload-text">Vui lòng upload file âm thanh</p> :
                                        <p className="ant-upload-text">Vui lòng upload file ảnh hoặc âm thanh</p>

                                }
                            </Dragger> : ''
                    }

                </div>

                {
                    formExercise.type !== EXERCISE_TYPES.LISTEN &&
                    <>
                        {
                            formExercise.prompt.type !== PROMPT_EXERCISE_TYPES.CONNECT_WORD &&
                            <div className={`input-wrap ${styles.boxPromptWrap}`}>
                                <div className={styles.boxLabelWrap}>
                                    <div className={"label-wrap"}>
                                        Các lựa chọn
                                        <span className={"required"}>*</span>
                                    </div>

                                    <Tooltip placement="top" title={<div>Nhập đáp án và nhấn enter để lưu</div>}>
                                        <InlineSVG src={Question} width={16}/>
                                    </Tooltip>
                                </div>


                                <div className={styles.inputType}>
                                    <Select
                                        className={`main-select`}
                                        showSearch={false}
                                        mode="tags"
                                        style={{ width: '100%' }}
                                        placeholder="Nhập lựa chọn"
                                        value={formExercise.choices}
                                        onChange={(value) => handleChangeSelect('choices', value)}
                                        options={[]}
                                        open={false}
                                        suffixIcon={false}
                                    />
                                </div>
                            </div>
                        }
                    </>
                }

                <div className={`input-wrap ${styles.boxPromptWrap}`}>
                    <div className={styles.labelGroup}>


                        <div className={styles.boxLabelWrap}>
                            <div className={"label-wrap"}>
                                Đáp án đúng
                                <span className={"required"}>*</span>
                            </div>

                            {
                                formExercise.type === EXERCISE_TYPES.LISTEN &&
                                <Tooltip placement="top" title={<div>Nhập kết quả và nhấn enter để lưu</div>}>
                                    <InlineSVG src={Question} width={16}/>
                                </Tooltip>
                            }

                            {
                                formExercise.type === EXERCISE_TYPES.FILL_IN_BLANK ||
                                (
                                    formExercise.type === EXERCISE_TYPES.MATCH &&
                                    formExercise.prompt.type === PROMPT_EXERCISE_TYPES.TEXT
                                )?
                                <Tooltip placement="top" title={<div>Chọn kết quả đúng vị trí</div>}>
                                    <InlineSVG src={Question} width={16}/>
                                </Tooltip> : ''
                            }
                        </div>

                        {
                            formExercise.prompt.type === PROMPT_EXERCISE_TYPES.CONNECT_WORD &&
                            <Button
                                className={styles.btnAddItem}
                                onClick={() => handleCreateItemAnswerTypeMatch()}
                            >Thêm
                            </Button>
                        }
                    </div>

                    {
                        formExercise.prompt.type !== PROMPT_EXERCISE_TYPES.CONNECT_WORD ?
                            <div className={styles.inputType}>
                                {
                                    formExercise.type === EXERCISE_TYPES.LISTEN &&
                                    formExercise.choices.length === 0 ?
                                        <Select
                                            className={`main-select`}
                                            showSearch={false}
                                            mode="tags"
                                            style={{ width: '100%' }}
                                            placeholder="Chọn đáp án đúng"
                                            value={formExercise.correct_answers}
                                            onChange={(value) => handleChangeSelect('correct_answers', value)}
                                            options={[]}
                                            open={false}
                                            suffixIcon={false}
                                        /> :
                                        <Select
                                            className={`main-select`}
                                            mode={
                                                formExercise.type !== EXERCISE_TYPES.SINGLE_CHOICE &&
                                                "multiple"
                                            }
                                            showSearch={false}
                                            style={{ width: '100%' }}
                                            placeholder="Chọn đáp án đúng"
                                            value={formExercise.correct_answers}
                                            onChange={(value) => handleChangeSelect('correct_answers', value)}
                                            options={formExercise.choices ? formExercise.choices.map(item => ({
                                                value: item,
                                                label: `${item}`,
                                            })) : []}
                                        />
                                }
                            </div> :
                            <div className={styles.correctAnswersGroup}>
                                {
                                    formExercise.correct_answers.map((correct_answer, index) => {
                                        return (
                                            <div key={index} className={styles.answerWrap}>
                                                <div className={styles.mainWrap}>
                                                    <div>
                                                        <div className={"label-wrap"}>
                                                            en
                                                        </div>
                                                        <Input
                                                            className="main-input"
                                                            size={"large"}
                                                            placeholder={'Nhập kết quả'}
                                                            value={correct_answer.en}
                                                            onChange={(e) => handleChangeCorrectAnswersTypeMatch(index, 'en', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className={styles.iconWrap}>
                                                        <InlineSVG src={Change} width={14}/>
                                                    </div>
                                                    <div>
                                                        <div className={"label-wrap"}>
                                                            vi
                                                        </div>
                                                        <Input
                                                            className="main-input"
                                                            size={"large"}
                                                            placeholder={'Nhập kết quả'}
                                                            value={correct_answer.vi}
                                                            onChange={(e) => handleChangeCorrectAnswersTypeMatch(index, 'vi', e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                {
                                                    formExercise.correct_answers.length > 1 &&
                                                    <div className={styles.btnWrap}>
                                                        <Button
                                                            className={styles.btnDelete}
                                                            onClick={() => handleDeleteItemAnswerTypeMatch(index)}
                                                        >Xóa
                                                        </Button>
                                                    </div>
                                                }

                                            </div>
                                        )
                                    })
                                }
                            </div>
                    }

                </div>
            </div>

            <div className={styles.btnWrap}>
                <Button
                    className={styles.btnConfirm}
                    onClick={() => handleCreateExercise()}
                >Tạo bài tập
                </Button>
            </div>
        </Modal>
    )
}
