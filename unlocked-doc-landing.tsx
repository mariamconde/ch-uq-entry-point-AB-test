import React from 'react'
import useStyles from 'isomorphic-style-loader/dist/useStyles'
import UnlockedLandingContext from './state/unlocked-landing-state'
import { UnlockedDocSidebarProps } from 'component/unlocked-doc-sidebar'
import UnlockedDocHeader from 'component/unlocked-doc-header-v2/unlocked-doc-header'
import { ViewerProps } from 'unlocked-viewer/types/viewer'
import { UnlockedDocHeaderPropsDefault } from 'component/unlocked-doc-header-v2/unlocked-doc-header.types'
import LearningPanel from 'unlocked-doc-landing/components/learning-panel/unlocked-learning-panel'
import styles from './unlocked-doc-landing.module.scss'
import { UnlockedDocLandingContent } from './components/unlocked-doc-landing-content/unlocked-doc-landing-content'
//@ts-ignore
import tailwindStyles from 'assets/base.tailwind.css'
import { UnlockedDocLandingLoader } from 'unlocked-doc-landing/unlocked-doc-landing-loader'
import { SmartScanSuccessModal } from 'unlocked-viewer/component/smart-scan/success-modal/smart-scan-success-modal'
import { UnlockedDocHeaderProcessing } from 'component/unlocked-doc-header-v2/unlocked-doc-header-processing'
import { PageSkeletonLoader } from 'unlocked-doc-landing/components/page-skeleton-loader/page-skeleton-loader'
import { QuestionLifecycleStateSyncWithinLandingContext } from 'unlocked-viewer/component/loaders/question-lifecycle-state-subscription'
import { UnlockedDocMobile } from 'unlocked-doc-landing/mobile/unlocked-doc-mobile'
import { SmartScanSSIMWebSuccessModal } from 'unlocked-viewer/component/smart-scan/mweb/smart-scan-mweb-success-modal-ssi'
import { useFullstory } from './hooks/useFullstory'

export type UnlockedDocLandingPropsProcessing = {
    isProcessing: true
    title: string
}

export type UnlockedDocLandingPropsDefault = {
    isProcessing: false
    unlockedLandingProps: ViewerProps &
        UnlockedDocHeaderPropsDefault &
        UnlockedDocSidebarProps & {
            isUploader: boolean
            subscriptionType: string
            displaySmartScanSuccessModal: boolean
            isUnlockedTourEnabled: boolean
            isMobile: boolean
            isTemporaryUpload: boolean
            isBasicUnlocked: boolean
            onboardingCourseDocumentCount: number
            documentQuestionChatEnabled: boolean
            documentPaperChatEnabled: boolean
            documentMobilePaperChatEnabled: boolean
            isLoggedOut: boolean
            documentSubject: string
            documentType: string
            uqEntrypointRedesignEnabled: boolean
            quizMakerButtonEnabled: boolean
            isAiHomeworkHelp: boolean
        }
    containerRef?: HTMLElement
}

export type UnlockedDocLandingProps =
    | UnlockedDocLandingPropsProcessing
    | UnlockedDocLandingPropsDefault

const SSI_UNLOCKED_LANDING_TEST_ID = 'SSI_UNLOCKED_LANDING_TEST_ID'

const UnlockedDocLanding: React.FunctionComponent<UnlockedDocLandingProps> = (
    props: UnlockedDocLandingProps,
) => {
    useStyles(tailwindStyles)
    useStyles(styles)
    const [viewerClasses, setViewerClasses] = React.useState('')
    useFullstory('unlocked-landing-page')
    if (props.isProcessing) {
        return (
            <div
                data-testid={SSI_UNLOCKED_LANDING_TEST_ID}
                className={`tw-bg-gray-20 tw-w-full`}
            >
                <div className="unlocked-document-header tw-w-full stickTop">
                    <UnlockedDocHeaderProcessing title={props.title} />
                </div>
                <div
                    className={
                        'tw-flex tw-w-full tw-max-w-[1440px] tw-px-16 tw-m-auto tw-pb-28 tw-justify-between'
                    }
                >
                    <PageSkeletonLoader answerRailDisabled={false} />
                </div>
            </div>
        )
    } else {
        const { containerRef, unlockedLandingProps } = props

        const viewerProps = {
            dbFilename: unlockedLandingProps!.dbFilename,
            contentId: unlockedLandingProps!.dbFilename,
            documentModel: unlockedLandingProps!.documentModel,
            loadedPages: {},
            hasQuestionsAndAnswers: true,
            isDesktop: !!unlockedLandingProps!.isDesktop,
            isEducator: unlockedLandingProps!.isEducator,
            isTutor: unlockedLandingProps!.isTutor,
            renderClientSide: false,
            userID: unlockedLandingProps!.userID,
            userName: unlockedLandingProps!.userName,
            isUQCreditConsolidationEnabled:
                unlockedLandingProps!.isUQCreditConsolidationEnabled || false,
            filehash: unlockedLandingProps!.filehash,
            smartScanMode: unlockedLandingProps!.smartScanMode,
            documentMetadataProperties:
                unlockedLandingProps!.documentMetadataProperties,
            documentSocialProofProperties:
                unlockedLandingProps!.documentSocialProofProperties,
            uploadMonth: unlockedLandingProps!.uploadMonth,
            uploadYear: unlockedLandingProps!.uploadYear,
            documentPlatformEnabled:
                unlockedLandingProps!.documentPlatformEnabled,
            ssiUnlockedLandingEnabled:
                unlockedLandingProps!.ssiUnlockedLandingEnabled,
            viewerClasses,
            setViewerClasses,
            containerRef,
            subscriptionType: unlockedLandingProps.subscriptionType,
            isGraphQlEnabled: !!unlockedLandingProps.isGraphQlEnabled,
            isLifecycleStateEnabled:
                unlockedLandingProps.isLifecycleStateEnabled,
            externalSearchConfig: unlockedLandingProps.externalSearchConfig,
            userDownloadState: unlockedLandingProps.userDownloadState,
            isPinpoint: !!unlockedLandingProps.isPinpoint,
            isUploader: unlockedLandingProps.isUploader,
            numConcepts: unlockedLandingProps.numConcepts,
            smartScanDocState: unlockedLandingProps.smartScanDocState,
            isTemporaryUpload: unlockedLandingProps.isTemporaryUpload,
            isBasicUnlocked: unlockedLandingProps.isBasicUnlocked,
            isChromeBasedBrowser: unlockedLandingProps.isChromeBasedBrowser,
        }

        const headerProps = {
            dbFilename: unlockedLandingProps.dbFilename,
            smartScanMode: unlockedLandingProps.smartScanMode,
            contentId: unlockedLandingProps.dbFilename,
            isPinpoint: unlockedLandingProps.isPinpoint,
            ssiUnlockedLandingEnabled:
                unlockedLandingProps.ssiUnlockedLandingEnabled,
            documentPlatformEnabled:
                unlockedLandingProps.ssiUnlockedLandingEnabled,
            title: unlockedLandingProps.title,
            isUploader: unlockedLandingProps.isUploader,
            isEducator: unlockedLandingProps.isEducator,
            schoolUrl: unlockedLandingProps.schoolUrl,
            school: unlockedLandingProps.school,
            courseUrl: unlockedLandingProps.courseUrl,
            course: unlockedLandingProps.course,
            uploaderUrl: unlockedLandingProps.uploaderUrl,
            uploader: unlockedLandingProps.uploader,
            uploadedDate: unlockedLandingProps.uploadedDate,
            isFreeDocument: unlockedLandingProps.isFreeDocument,
            isProcessing: unlockedLandingProps.isProcessing,
            isLoggedOut: unlockedLandingProps.isLoggedOut,
        }

        const sidebarProps = {
            relatedDocuments: unlockedLandingProps.relatedDocuments,
            textbookSolutions: unlockedLandingProps.textbookSolutions,
            literatureStudyGuides: unlockedLandingProps.literatureStudyGuides,
            smartScanRelatedDocs: unlockedLandingProps.smartScanRelatedDocs,
            isUploaderEnabled: unlockedLandingProps.isUploaderEnabled,
            shouldShowSymbolab: unlockedLandingProps.shouldShowSymbolab,
            smartScanMode: unlockedLandingProps.smartScanMode,
            contentId: unlockedLandingProps.dbFilename,
            isEducator: unlockedLandingProps.isEducator,
            quizMakerButtonEnabled: unlockedLandingProps.quizMakerButtonEnabled,
            isAiHomeworkHelp: unlockedLandingProps.isAiHomeworkHelp,
        }

        return (
            <UnlockedLandingContext
                initialState={{
                    filehash: viewerProps.filehash,
                    smartScanMode: viewerProps.smartScanMode,
                    contentId: viewerProps.dbFilename,
                    userId: viewerProps.userID,
                    userName: viewerProps.userName,
                    showExternalAnswerOnTop:
                        viewerProps.externalSearchConfig
                            ?.showExternalAnswerOnTop,
                    showAnswerRailAskTutor:
                        viewerProps.externalSearchConfig
                            ?.showAnswerRailAskTutor,
                    subscriptionType: unlockedLandingProps.subscriptionType,
                    capabilities: {
                        documentPlatformEnabled:
                            !!unlockedLandingProps.documentPlatformEnabled,
                        includeUQAnswers: true,
                        unlockUQAnswers:
                            unlockedLandingProps.subscriptionType === 'premier',
                        isLifecycleStateEnabled:
                            unlockedLandingProps.isLifecycleStateEnabled,
                        unlockedTourEnabled:
                            unlockedLandingProps.isUnlockedTourEnabled,
                        canSpotlightCourse:
                            unlockedLandingProps.onboardingCourseDocumentCount >=
                            10,
                        answerRailCollapsed:
                            unlockedLandingProps.documentPaperChatEnabled,
                        chromeExtensionModalEnabled:
                            unlockedLandingProps.isChromeBasedBrowser,
                        uqEntrypointRedesignEnabled:
                            unlockedLandingProps.uqEntrypointRedesignEnabled,
                    },
                    documentQuestionChatEnabled:
                        unlockedLandingProps.documentQuestionChatEnabled,
                    documentPaperChatEnabled:
                        unlockedLandingProps.documentPaperChatEnabled,
                    documentMobilePaperChatEnabled:
                        unlockedLandingProps.documentMobilePaperChatEnabled,
                    enrichmentsDisabled: false,
                    isMobile: unlockedLandingProps.isMobile,
                    isEducator: unlockedLandingProps.isEducator,
                    showUnlockedTour:
                        unlockedLandingProps.isUnlockedTourEnabled &&
                        !unlockedLandingProps.displaySmartScanSuccessModal &&
                        !viewerProps.isEducator &&
                        !viewerProps.isTutor,
                    chatIsOpen: unlockedLandingProps.documentPaperChatEnabled,
                    chatIsFromAnswerRail: false,
                    chatMessages: {},
                    chatKey: -1,
                    documentSubject: unlockedLandingProps.documentSubject,
                    showChromeExtensionModal: false,
                    documentType: unlockedLandingProps.documentType,
                }}
            >
                <UnlockedDocLandingLoader />
                <QuestionLifecycleStateSyncWithinLandingContext />
                {unlockedLandingProps.isMobile ? (
                    <>
                        <UnlockedDocMobile
                            headerProps={headerProps}
                            viewerProps={viewerProps}
                            containerRef={containerRef}
                            documentMobilePaperChatEnabled={
                                unlockedLandingProps.documentMobilePaperChatEnabled
                            }
                        />
                        {unlockedLandingProps.displaySmartScanSuccessModal && (
                            <SmartScanSSIMWebSuccessModal />
                        )}
                    </>
                ) : (
                    <>
                        <div
                            data-testid={SSI_UNLOCKED_LANDING_TEST_ID}
                            className={`tw-bg-gray-20 tw-w-full`}
                        >
                            <div className="unlocked-document-header tw-w-full stickTop">
                                <UnlockedDocHeader
                                    {...headerProps}
                                    isProcessing={false}
                                />
                            </div>
                            <UnlockedDocLandingContent
                                setViewerClasses={setViewerClasses}
                                viewerProps={viewerProps}
                                sidebarProps={sidebarProps}
                                viewerClasses={viewerClasses}
                                containerRef={containerRef}
                            />
                        </div>
                        {viewerProps.documentPlatformEnabled &&
                            !unlockedLandingProps.documentQuestionChatEnabled && (
                                <LearningPanel />
                            )}
                        {unlockedLandingProps.displaySmartScanSuccessModal && (
                            <SmartScanSuccessModal />
                        )}
                    </>
                )}
            </UnlockedLandingContext>
        )
    }
}

export default UnlockedDocLanding
