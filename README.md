# ch-uq-entry-point-AB-test-frontend

Update capabilities:
- Use the isUQEntryPointEnabled prop value to add it into the capabilities of the component.
Interface modification:
- Add a new capability in the interface as a boolean to represent isUQEntryPointEnabled.
Modify the use-unlocked-doc-capabilities hook:
- Remove the if statement from the use-unlocked-doc-capabilities hook.
- Instead, make the hook return the value that was hard-coded in the fragment/unlocked-doc-landing.tsx file.
Display the icon based on the hook value:
- Use the value of the hook (which represents isUQEntryPointEnabled) to conditionally display the icon either on top or next to the text.


Feature Flag:

To test the feature flag using Opsh (Ops Console), follow these steps:
- Run Opsh (Ops Console) using the command provided.
- Once authenticated, you should see a message indicating that you have switched to the dev environment.
- Run commands using the Opsh terminal using the format [runonce -c COMMAND + PARAMS].
- To toggle feature flags on/off, use the FeatureFlagCommand.php located in the monolith repository. Look for the comment specifying the command format: 
[ch:ab_test:command:feature_flag flagName type typeId --disable|--remove].

Define a flag name for your feature flag.
- To enable the feature flag, use the command [runonce -c docexp_uq_entry_enabled global 1].
- To disable the feature flag, use the command [runonce -c docexp_uq_entry_enabled global 1 --disable].

After running the command, you can confirm the status by accessing the endpoint [DOMAIN/api/v1/featureFlags/{featureFlagName}/{type}/{typeId}/].

In this case, you would visit [DOMAIN/api/v1/featureFlags/docexp_uq_entry_enabled/global/1/].
- To use the feature flag in code instead of a hard-coded boolean in fragment/unlocked-doc-landing.tsx, modify the code as follows:

With this modification, you can test the feature flag by running the Opsh command instead of changing the code itself.
Should be able to test and control the feature flag using Opsh commands without directly modifying the code.


Monolith
- Has a/b test definition

Platform aka SSI
- Feature flag name
- Ab test name
- Logic
- UI changes

