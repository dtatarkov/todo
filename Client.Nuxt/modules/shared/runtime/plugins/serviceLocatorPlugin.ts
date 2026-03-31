import { ServiceLocator } from "@@/modules/shared/runtime/app/interfaces/ServiceLocator";
import { ServiceLocatorBase } from "@@/modules/shared/runtime/app/entities/serviceLocatorBase";

export default defineNuxtPlugin((nuxtApp) =>
{
  nuxtApp.provide(ServiceLocator.name, new ServiceLocatorBase());
})