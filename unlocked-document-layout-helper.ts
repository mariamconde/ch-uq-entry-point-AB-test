import newrelic from 'newrelic'
import { getBucketValue, IdentifierType } from '@coursehero/abtest-sdk'
import type { IncomingHttpHeaders } from 'http'
import { UserType } from 'models/user'
import { isDesktop } from 'utils/device-detector'
import DocumentViewerSDK, {
    UnlockedContentResponse,
} from 'sdk/document-viewer-sdk'
import { HeroRequest, HeroResponse } from '@herokit/server'
import FeatureFlagSDK, {
    isFeatureEnabled,
    isFeatureFlagEnabled,
} from '@coursehero/featureflag-sdk'
import {
    DOC_EXP_DOC_PLATFORM_ANSWER_BUBBLE_VARIATIONS,
    DOC_EXP_DOCUMENT_PLATFORM_RELEASE,
    DOC_EXP_UNLOCKED_DOCUMENT_QUESTION_CHAT,
    DOC_EXP_UNLOCKED_DOCUMENT_UQ_COPY_PHASE_2,
    DOC_EXP_UNLOCKED_NON_PPO_CHAT,
    DOC_EXP_UNLOCKED_DOCUMENT_MOBILE_PAPER_CHAT,
    ONB_QUIZ_MAKER_BUTTON,
} from 'constants/testnames'
import {
    DOC_EXP_DOCUMENT_PLATFORM,
    DOCEXP_DOC_PLATFORM_ANSWER_BUBBLE_VARIATIONS,
    DOCEXP_UNLOCKED_DOCUMENT_PAPER_CHAT,
    DOCEXP_UNLOCKED_DOCUMENT_QUESTION_CHAT,
    DOCEXP_UNLOCKED_DOCUMENT_MOBILE_PAPER_CHAT,
    DOCEXP_UNLOCKED_DOCUMENT_UQ_COPY_PHASE_2,
    ONB_QUIZ_MAKER_BUTTON_FF,
    UPLD_SMARTSCAN_AI_CTA,
} from 'constants/feature-flags'

export const UNLOCKED_TOUR_HEADER = 'ch-use-unlocked-tour'
export const DOCUMENT_QUESTION_CHAT_HEADER = 'ch-use-document-question-chat'
export const DOCUMENT_PAPER_CHAT_HEADER = 'ch-use-document-paper-chat'
export const DOCUMENT_MOBILE_PAPER_CHAT_HEADER =
    'ch-use-document-mobile-paper-chat'

/**
 * Currently only used for Uploader
 */
export const isHeaderEnabled = (
    header: string,
    headers: IncomingHttpHeaders,
) => {
    const headerValue = headers[header]
    return headerValue ? parseInt(headerValue as string) > 0 : false
}

interface DocPlatformLayout {
    isFeatureFlagEnabled: boolean
    bucketValue: number
}

export const getDefaultDocPlatformLayout = (): DocPlatformLayout => {
    return {
        isFeatureFlagEnabled: false,
        bucketValue: 0,
    }
}

export const isExcludedUserType = (req: HeroRequest) => {
    return (
        req.auth.userType === UserType.EDUCATOR ||
        req.auth.userType === UserType.TUTOR ||
        req.auth.userType === UserType.PINPOINT
    )
}

export const getSubscriptionType = (
    subscriptionType: string,
): { isPremier: boolean; isBasic: boolean; isLoggedOut: boolean } => {
    return {
        isPremier: subscriptionType === 'premier',
        isBasic: subscriptionType === 'basic',
        isLoggedOut: subscriptionType === 'logged-out',
    }
}

/**
 * Function to get a/b test flag and bucket data for Document Platform
 *
 */
export const documentPlatformHelper = async (
    req: HeroRequest,
    featureFlagSDK: FeatureFlagSDK,
): Promise<DocPlatformLayout> => {
    let docPlatformLayout = getDefaultDocPlatformLayout()
    if (!isExcludedUserType(req) && isDesktop(req)) {
        docPlatformLayout.isFeatureFlagEnabled = await isFeatureFlagEnabled(
            DOC_EXP_DOCUMENT_PLATFORM,
            featureFlagSDK,
        )
    }

    if (!docPlatformLayout.isFeatureFlagEnabled) {
        return docPlatformLayout
    }

    docPlatformLayout.bucketValue = await getBucketValue(
        req,
        DOC_EXP_DOCUMENT_PLATFORM_RELEASE,
        IdentifierType.USER_ID,
    )
    return docPlatformLayout
}

/**
 * Helper function to check feature flag and get bucket value for
 * doc_exp_doc_platform_answer_bubble_cta_content test
 */
export const docPlatAnswerBubbleCtaContentHelper = async (
    req: HeroRequest,
    featureFlagSDK: FeatureFlagSDK,
): Promise<DocPlatformLayout> => {
    // re-using this for now, probably needs a rename in future
    let docPlatformLayout = getDefaultDocPlatformLayout()
    if (!isExcludedUserType(req) && isDesktop(req)) {
        docPlatformLayout.isFeatureFlagEnabled = await isFeatureFlagEnabled(
            DOCEXP_DOC_PLATFORM_ANSWER_BUBBLE_VARIATIONS,
            featureFlagSDK,
        )
    }

    if (!docPlatformLayout.isFeatureFlagEnabled) {
        return docPlatformLayout
    }

    docPlatformLayout.bucketValue = await getBucketValue(
        req,
        DOC_EXP_DOC_PLATFORM_ANSWER_BUBBLE_VARIATIONS,
        IdentifierType.USER_ID,
    )
    return docPlatformLayout
}

// Helper utility to get the User type for the getUserdownloadState function
const getUserTypeForDownload = (req: HeroRequest) => {
    return isExcludedUserType(req)
        ? 'EXCLUDED_USER'
        : req.auth.subscriptionType === 'logged-out'
        ? 'LOGGED_OUT'
        : req.auth.subscriptionType === 'premier'
        ? 'PREMIER'
        : 'BASIC'
}

/**
 * Shared function to determine whether the user can download/print from the toolbar
 * based on the user type.
 * The user object returned does not have join date so we are hardcoding a value to
 * check against- any userID created after this will be determined as a 'new user'
 */
export const getUserDownloadState = async (
    req: HeroRequest,
    hasUnlocks: boolean,
    unlockedDoc: boolean,
): Promise<UserDownloadStates> => {
    return newrelic.startSegment('getUserDownloadState', true, async () => {
        const USER_TYPE: UserTypeDownloadState = getUserTypeForDownload(req)

        // Excluded user types don't get affected by this - remain to download while
        // logged out users will be sent to registration page
        if (USER_TYPE === 'EXCLUDED_USER' || USER_TYPE === 'LOGGED_OUT') {
            return USER_DOWNLOAD_STATE_TREE[USER_TYPE]
        }

        const DOC_TYPE = unlockedDoc ? 'UNLOCKED_DOC' : 'LOCKED_DOC'
        const UNLOCK_TYPE = hasUnlocks ? 'HAS_UNLOCKS' : 'NO_UNLOCKS'

        // Premier users don't get bucketed.
        // Determine the correct flow based on the doc type and if they have unlocks
        if (USER_TYPE === 'PREMIER') {
            return USER_DOWNLOAD_STATE_TREE[USER_TYPE][DOC_TYPE][UNLOCK_TYPE]
        }

        return USER_DOWNLOAD_STATE_TREE[USER_TYPE][DOC_TYPE][UNLOCK_TYPE]
    })
}

export type UserDownloadStates =
    | 'REDIRECT_TO_REGISTRATION'
    | 'DOWNLOAD'
    | 'REDIRECT_TO_PAYMENT'

type UserTypeDownloadState = keyof typeof USER_DOWNLOAD_STATE_TREE

// Declaring this `as const` gives us readonly type safety and checking on all lookups and usage
// If the path on what a basic/premier user can do changes, we only need to update the field
// of that specific case here and not touch the above functions logic
const USER_DOWNLOAD_STATE_TREE = {
    LOGGED_OUT: 'REDIRECT_TO_REGISTRATION',
    EXCLUDED_USER: 'DOWNLOAD',
    BASIC: {
        LOCKED_DOC: {
            HAS_UNLOCKS: 'DOWNLOAD',
            NO_UNLOCKS: 'REDIRECT_TO_REGISTRATION',
        },
        UNLOCKED_DOC: {
            HAS_UNLOCKS: 'DOWNLOAD',
            NO_UNLOCKS: 'REDIRECT_TO_REGISTRATION',
        },
    },
    PREMIER: {
        LOCKED_DOC: {
            HAS_UNLOCKS: 'DOWNLOAD',
            NO_UNLOCKS: 'REDIRECT_TO_REGISTRATION',
        },
        UNLOCKED_DOC: {
            HAS_UNLOCKS: 'DOWNLOAD',
            NO_UNLOCKS: 'DOWNLOAD',
        },
    },
} as const

// Returns all relevant properties from the unlocked content response
// for determining appropriate smart scan state
export const getSmartScanProperties = (
    unlockedContentResponse: UnlockedContentResponse | undefined,
) => {
    const isTemporaryUpload =
        unlockedContentResponse?.isTemporaryUpload ?? false
    const isBasicUnlocked = unlockedContentResponse?.isBasicUnlocked ?? false
    const isProcessingComplete =
        unlockedContentResponse?.processingComplete ?? false
    const hasBeenViewed = unlockedContentResponse?.viewedOn ?? false

    return {
        isTemporaryUpload,
        isBasicUnlocked,
        isProcessingComplete,
        hasBeenViewed,
    } as const
}

type OnBoardingTourAndUQredesign = {
    courseDocCount: number
    showTour: boolean
}

export const getDefaultOnboardingTourAndUQredesign =
    (): OnBoardingTourAndUQredesign => {
        return {
            courseDocCount: 0,
            showTour: false,
        }
    }

export const getOnboardingTourAndUQredesignHelper = async (
    req: HeroRequest,
    res: HeroResponse,
    documentViewerSDK: DocumentViewerSDK,
    documentMetadataProperties: any,
): Promise<OnBoardingTourAndUQredesign> => {
    let onBoardingTourAndUQredesign = getDefaultOnboardingTourAndUQredesign()
    const tourHeader = 'ch-use-unlocked-tour'
    const hasTourHeader = req.headers[tourHeader]

    // Do not bucket educators and tutors
    const { userType } = req.auth
    if (([UserType.EDUCATOR, UserType.TUTOR] as string[]).includes(userType)) {
        return onBoardingTourAndUQredesign
    }

    onBoardingTourAndUQredesign.showTour = hasTourHeader
        ? isHeaderEnabled(tourHeader, req.headers)
        : await documentViewerSDK.getUnlockedLandingTourEnabled()

    const courseId = documentMetadataProperties?.courseId ?? 0
    if (courseId > 0) {
        onBoardingTourAndUQredesign.courseDocCount =
            await documentViewerSDK.getCourseDocumentCount(courseId)
    }

    return onBoardingTourAndUQredesign
}

// A/B test leaving constants here for now
// TODO move to shared area when needed
const DocumentTypesList = ['UncategorizedWrittenAssignment', 'Paper', 'Lab']
const SchoolCountryList = ['United States', 'Canada', 'Australia']

export const getDocumentQuestionChatEnabled = async (
    req: HeroRequest,
    res: HeroResponse,
    schoolCountry: string,
): Promise<boolean> => {
    const isDocQuestionChatHeaderEnabled = isHeaderEnabled(
        DOCUMENT_QUESTION_CHAT_HEADER,
        req.headers,
    )

    const { isPremier } = getSubscriptionType(req.auth.subscriptionType)

    if (isDocQuestionChatHeaderEnabled) {
        return true
    } else {
        const ff = await isFeatureEnabled(
            req,
            res,
            DOCEXP_UNLOCKED_DOCUMENT_QUESTION_CHAT,
        )

        if (
            !ff ||
            !SchoolCountryList.includes(schoolCountry) ||
            !isDesktop(req)
        ) {
            return false
        }

        if (isPremier) {
            const bucketValue = await getBucketValue(
                req,
                DOC_EXP_UNLOCKED_DOCUMENT_QUESTION_CHAT,
                IdentifierType.USER_ID,
            )

            if (bucketValue > 0) {
                return true
            }
        }
        return false
    }
}

export const getUQEntryPointEnabled = async (
    req: HeroRequest,
    res: HeroResponse,
): Promise<boolean> => {
    const isUQEntryPointEnabled = await isFeatureEnabled(
        req,
        res,
        DOCEXP_UNLOCKED_DOCUMENT_UQ_COPY_PHASE_2,
    )

    if (!isUQEntryPointEnabled) {
        return false
    }
    const bucketValue = await getBucketValue(
        req,
        DOC_EXP_UNLOCKED_DOCUMENT_UQ_COPY_PHASE_2,
        IdentifierType.USER_ID,
    )

    return bucketValue > 0
}

export const getDocumentPaperChatEnabled = async (
    req: HeroRequest,
    res: HeroResponse,
    schoolCountry: string, // TODO remove
    documentTypeML: string, // TODO remove
): Promise<boolean> => {
    const isDocPaperChatHeaderEnabled = isHeaderEnabled(
        DOCUMENT_PAPER_CHAT_HEADER,
        req.headers,
    )

    if (isDocPaperChatHeaderEnabled) {
        return true
    }

    const ff = await isFeatureEnabled(
        req,
        res,
        DOCEXP_UNLOCKED_DOCUMENT_PAPER_CHAT,
    )

    if (!ff || !isDesktop(req)) {
        return false
    }
    const bucketValue = await getBucketValue(
        req,
        DOC_EXP_UNLOCKED_NON_PPO_CHAT,
        IdentifierType.USER_ID,
    )

    return bucketValue > 0
}

export const getDocumentMobilePaperChatEnabled = async (
    req: HeroRequest,
    res: HeroResponse,
    schoolCountry: string,
    documentTypeML: string,
): Promise<boolean> => {
    const isDocPaperChatHeaderEnabled = isHeaderEnabled(
        DOCUMENT_MOBILE_PAPER_CHAT_HEADER,
        req.headers,
    )

    if (isDocPaperChatHeaderEnabled) {
        return true
    }

    const ff = await isFeatureEnabled(
        req,
        res,
        DOCEXP_UNLOCKED_DOCUMENT_MOBILE_PAPER_CHAT,
    )

    if (
        !ff ||
        !DocumentTypesList.includes(documentTypeML) ||
        !SchoolCountryList.includes(schoolCountry) ||
        !isDesktop(req)
    ) {
        return false
    }
    const bucketValue = await getBucketValue(
        req,
        DOC_EXP_UNLOCKED_DOCUMENT_MOBILE_PAPER_CHAT,
        IdentifierType.USER_ID,
    )
    return bucketValue > 0
}

export const getQuizMakerButtonEnabled = async (
    req: HeroRequest,
    res: HeroResponse,
) => {
    const ff = await isFeatureEnabled(req, res, ONB_QUIZ_MAKER_BUTTON_FF)

    if (!ff) {
        return false
    }

    const bucketValue = await getBucketValue(
        req,
        ONB_QUIZ_MAKER_BUTTON,
        IdentifierType.USER_ID,
    )

    return bucketValue === 1
}

export const isAiHomeworkHelpEnabled = async (
    req: HeroRequest,
    res: HeroResponse,
) => {
    if (!(await isFeatureEnabled(req, res, UPLD_SMARTSCAN_AI_CTA))) {
        return false
    }
    const bucketValue = await getBucketValue(
        req,
        UPLD_SMARTSCAN_AI_CTA,
        IdentifierType.ROOT_SESSION_ID,
    )
    return bucketValue > 0
}
