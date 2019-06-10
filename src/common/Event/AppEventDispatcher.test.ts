import appEventDispatcher from "./AppEventDispatcher";
import { AppEventType } from "./AppEventType";

describe("appEventDispatcher", () => {
  it("send & receive event", () => {
    let called = 0;
    let calledPayload: any;
    const fn = (type: AppEventType, payload: any) => {
      called++;
      calledPayload = payload;
    };
    const unsubscribeFn = appEventDispatcher.subscribe(
      "mouseDown",
      fn,
    );
    expect(called).toEqual(0);

    appEventDispatcher.dispatch("mouseDown", 15);
    expect(called).toEqual(1);
    expect(calledPayload).toEqual(15);

    // that event will not be dispatched
    appEventDispatcher.dispatch("mouseUp", 5);
    expect(called).toEqual(1);
    expect(calledPayload).toEqual(15);

    // unsubscribe
    unsubscribeFn();
    appEventDispatcher.dispatch("mouseDown", 5);
    expect(called).toEqual(1);
    expect(calledPayload).toEqual(15);
  });

  it("send with more parameters", () => {
    let calledParameters;

    const fn = (type: AppEventType, p1: any, p2: any, p3: any) => {
      calledParameters = [p1, p2, p3];
    };
    const unsubscribeFn = appEventDispatcher.subscribe("undo", fn);
    appEventDispatcher.dispatch("undo", "abc", 42, true);
    expect(calledParameters).toEqual(["abc", 42, true]);
    unsubscribeFn();
  });
});
