import useThrottle from '@/app/_utils/client/hooks/throttle';

import { act, renderHook } from '@testing-library/react';


describe('useThrottle', () => {
  jest.useFakeTimers();

  it('should call the callback immediately if enough time has passed', () => {
    const callback = jest.fn();
    const delay = 1000;
    const { result } = renderHook(() => useThrottle(callback, delay));

    act(() => {
      result.current();
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not call the callback again if called within the delay period', () => {
    const callback = jest.fn();
    const delay = 1000;
    const { result } = renderHook(() => useThrottle(callback, delay));

    act(() => {
      result.current();
    });

    act(() => {
      result.current();
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should call the callback again after the delay period has passed', () => {
    const callback = jest.fn();
    const delay = 1000;
    const { result } = renderHook(() => useThrottle(callback, delay));

    act(() => {
      result.current();
    });

    act(() => {
      jest.advanceTimersByTime(delay);
      result.current();
    });

    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should throttle multiple calls within the delay period', () => {
    const callback = jest.fn();
    const delay = 1000;
    const { result } = renderHook(() => useThrottle(callback, delay));

    act(() => {
      result.current();
      result.current();
      result.current();
    });

    expect(callback).toHaveBeenCalledTimes(1);
    
    act(() => {
      jest.advanceTimersByTime(delay);
    });

    act(() => {
      result.current();
      result.current();
      result.current();
      result.current();
    });

    expect(callback).toHaveBeenCalledTimes(2);
  });
});