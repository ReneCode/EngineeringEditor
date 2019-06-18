import appEventDispatcher from "./AppEventDispatcher";

describe("appEventDispatcher", () => {
  it("send & receive event", () => {
    let called = 0;
    let calledPayload: any;
    const fn = (payload: any) => {
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

    const fn = (p1: any, p2: any, p3: any) => {
      calledParameters = [p1, p2, p3];
    };
    const unsubscribeFn = appEventDispatcher.subscribe("undo", fn);
    appEventDispatcher.dispatch("undo", "abc", 42, true);
    expect(calledParameters).toEqual(["abc", 42, true]);
    unsubscribeFn();
  });

  it("do not dispatch new events in dispatch-loop", () => {
    let calledA = 0;
    let calledB = 0;

    const fA = () => {
      calledA++;
      unsubscribeFn.push(appEventDispatcher.subscribe("undo", fB));
    };
    const fB = () => {
      calledB++;
    };
    const unsubscribeFn = [];
    unsubscribeFn.push(appEventDispatcher.subscribe("undo", fA));
    appEventDispatcher.dispatch("undo");
    expect(calledA).toEqual(1);
    expect(calledB).toEqual(0);
    unsubscribeFn.forEach(fn => fn());
  });
});
