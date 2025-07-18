import { configureStore } from '@reduxjs/toolkit';
import generalSlice, {
  showLoader,
  stopLoader,
  setMobile,
  setMenubar,
  startConfetti,
  stopConfetti,
  addNotification,
  removeNotification,
  addError,
  clearErrors,
  updateUserPreferences,
} from '../../../src/redux/slices/generalSlice';

// Simple test first to debug
describe('generalSlice basic', () => {
  test('basic test', () => {
    expect(true).toBe(true);
  });
});

describe('generalSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        general: generalSlice,
      },
    });
  });

  test('initial state', () => {
    const state = store.getState().general;
    expect(state.loading).toEqual([]);
    expect(state.isMobile).toBe(false);
    expect(state.menubar).toBe(false);
    expect(state.confetti.show).toBe(false);
    expect(state.notifications).toEqual([]);
    expect(state.errors).toEqual([]);
    expect(state.userPreferences.theme).toBe('light');
  });

  test('showLoader action', () => {
    store.dispatch(showLoader());
    const state = store.getState().general;
    expect(state.loading).toContain(1);
  });

  test('stopLoader action', () => {
    // Add a loader first
    store.dispatch(showLoader());
    expect(store.getState().general.loading).toContain(1);

    // Stop the loader
    store.dispatch(stopLoader());
    const state = store.getState().general;
    expect(state.loading).toHaveLength(0);
  });

  test('setMobile action', () => {
    store.dispatch(setMobile(true));
    const state = store.getState().general;
    expect(state.isMobile).toBe(true);
  });

  test('setMenubar action', () => {
    store.dispatch(setMenubar(true));
    const state = store.getState().general;
    expect(state.menubar).toBe(true);
  });

  test('startConfetti action', () => {
    store.dispatch(startConfetti());
    const state = store.getState().general;
    expect(state.confetti.show).toBe(true);
  });

  test('stopConfetti action', () => {
    // Start confetti first
    store.dispatch(startConfetti());
    expect(store.getState().general.confetti.show).toBe(true);

    // Stop confetti
    store.dispatch(stopConfetti());
    const state = store.getState().general;
    expect(state.confetti.show).toBe(false);
  });

  test('addNotification action', () => {
    const notification = {
      id: '1',
      type: 'success',
      message: 'Test message',
    };

    store.dispatch(addNotification(notification));
    const state = store.getState().general;
    expect(state.notifications).toHaveLength(1);
    expect(state.notifications[0]).toEqual(
      expect.objectContaining({
        id: '1',
        type: 'success',
        message: 'Test message',
      }),
    );
  });

  test('removeNotification action', () => {
    // Add a notification first
    const notification = { id: '1', type: 'success', message: 'Test' };
    store.dispatch(addNotification(notification));
    expect(store.getState().general.notifications).toHaveLength(1);

    // Remove notification
    store.dispatch(removeNotification('1'));
    const state = store.getState().general;
    expect(state.notifications).toHaveLength(0);
  });

  test('addError action', () => {
    const error = { message: 'Something went wrong' };
    store.dispatch(addError(error));
    const state = store.getState().general;
    expect(state.errors).toHaveLength(1);
    expect(state.errors[0]).toMatchObject(error);
    expect(state.errors[0]).toHaveProperty('id');
    expect(state.errors[0]).toHaveProperty('timestamp');
  });

  test('clearErrors action', () => {
    // Add error first
    store.dispatch(addError({ message: 'Test error' }));
    expect(store.getState().general.errors).toHaveLength(1);

    // Clear errors
    store.dispatch(clearErrors());
    const state = store.getState().general;
    expect(state.errors).toHaveLength(0);
  });

  test('updateUserPreferences action', () => {
    const preferences = { theme: 'dark', soundEnabled: false };
    store.dispatch(updateUserPreferences(preferences));
    const state = store.getState().general;
    expect(state.userPreferences.theme).toBe('dark');
    expect(state.userPreferences.soundEnabled).toBe(false);
  });

  test('multiple actions maintain state consistency', () => {
    // Perform multiple actions
    store.dispatch(setMobile(true));
    store.dispatch(setMenubar(true));
    store.dispatch(addNotification({ type: 'success', message: 'Success!' }));
    store.dispatch(showLoader());

    const state = store.getState().general;
    expect(state.isMobile).toBe(true);
    expect(state.menubar).toBe(true);
    expect(state.notifications).toHaveLength(1);
    expect(state.loading).toContain(1);
  });
});
