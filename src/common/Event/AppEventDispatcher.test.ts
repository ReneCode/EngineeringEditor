import appEventDispatcher from "./AppEventDispatcher";
import { AppEventType } from "./AppEventType";

describe("appEventDispatcher", () => {
  it("send & receive event", () => {
    let called = 0;
    let calledPayload: any;
    const fn = (type: AppEventType, payload: any) => {
      console.log("called");
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
});
