import { BedrockChatParametersInput } from "./lib/utils/parameter-models";

export const bedrockChatParams = new Map<string, BedrockChatParametersInput>();
// You can define multiple environments and their parameters here
// bedrockChatParams.set("dev", {});

// If you define "default" environment here, parameters in cdk.json are ignored
// bedrockChatParams.set("default", {});
bedrockChatParams.set("dev", {
    enableRagReplicas: false, // Cost-saving for dev environment
    enableBotStoreReplicas: false, // Cost-saving for dev environment
});