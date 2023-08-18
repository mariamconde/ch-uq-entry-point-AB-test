import React, { useRef } from 'react'
import cn from 'classnames'
import {
    ActionType,
    trackCtaClicked,
} from '@coursehero/util/lib/amplitude-service'
import QAIcon from 'assets/qa-icon-doc-variant.svg'
import { Button } from '@granite/react-components'
import { useInTour } from '../../hooks/use-in-tour'
import { useUnlockedDocCapabilities } from 'unlocked-viewer/hooks/use-unlocked-doc-capability'

export const ASK_A_TUTOR_TEST_ID = 'ASK_A_TUTOR_TEST_ID'
/**
 * DOCEXP-1276: Mission milestone UQ Entrypoint copy changes
 */
type Copy = Record<'DEFAULT', string>

export const TITLE: Copy = {
    DEFAULT: 'Have another question?',
}

export const SUBTEXT: Copy = {
    DEFAULT:
        'Get answers and explanations from our Expert Tutors, in as little as 20 minutes.',
}

export const CTA: Copy = {
    DEFAULT: 'Ask your question',
}

interface AskATutorButtonProps {
    isQuestionMode?: boolean
    redirectClick?: string
    trackClick?: () => void
    documentPlatformEnabled?: boolean
}

export const AskATutorButtonV2 = ({
    isQuestionMode = false,
    redirectClick,
    trackClick,
}: AskATutorButtonProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const ref = useRef<HTMLDivElement>(null)

    const [uqEntrypointRedesignEnabled] = useUnlockedDocCapabilities([
        'uqEntrypointRedesignEnabled',
    ])

    const handleOnClick = () => {
        if (!!redirectClick) {
            window.open(redirectClick)
        } else {
            ;(window as any).openAskExpertTutorsWorkflow({
                sourceApp: 'Unlocked Document Sidebar',
            })
            buttonRef?.current?.blur()
            if (trackClick) {
                trackClick()
            } else {
                trackCtaClicked({
                    actionType: ActionType.PRIMARY,
                    text: CTA.DEFAULT,
                    intent: 'Open get-homework-help modal [CaaP]',
                    xpath: 'Document Header',
                })
            }
        }
    }

    useInTour({
        name: 'askATutor',
        ref,
    })

    const renderIcon = () => {
        if (uqEntrypointRedesignEnabled) {
            return (
                <div className="tw-flex tw-items-start tw-mb-6">
                    <img
                        className={'tw-h-[58px] tw-w-[59px] tw-mr-4'}
                        src={QAIcon}
                        alt="question answer icon"
                    />
                    <span className="tw-mb-4 tw-font-medium tw-text-lg tw-text-gray-80 tw-text-start">
                        {TITLE.DEFAULT}
                    </span>
                </div>
            )
        }
        return (
            <>
                <div className="tw-flex tw-justify-center tw-mb-6">
                    <img
                        className={'tw-h-[58px] tw-w-[59px]'}
                        src={QAIcon}
                        alt="question answer icon"
                    />
                </div>
                <span className="tw-mb-4 tw-font-medium tw-text-lg tw-text-gray-80 tw-text-center">
                    {TITLE.DEFAULT}
                </span>
            </>
        )
    }

    return (
        <div
            id={'siderail-ask-a-tutor'}
            data-testid={ASK_A_TUTOR_TEST_ID}
            className="tw-flex tw-items-end tw-text-left tw-bg-white tw-p-8 lg:tw-items-end tw-rounded-lg tw-mb-8"
            ref={ref}
        >
            <div className={`tw-flex tw-flex-col`}>
                {renderIcon()}
                <span className="tw-text-gray-70 tw-text-md tw-pr-10 tw-mb-6">
                    {SUBTEXT.DEFAULT}
                </span>
                <Button
                    variant="tertiary"
                    size="md"
                    onClick={handleOnClick}
                    data-cha-target-name="aaq"
                    data-cha-action-type="workflow_step"
                    data-cha-action-target-type="page"
                    data-cha-action-target-id="AAQ Form"
                    data-cha-location={
                        isQuestionMode ? 'question_mode' : 'document_mode'
                    }
                >
                    <span>{CTA.DEFAULT}</span>
                </Button>
            </div>
        </div>
    )
}
