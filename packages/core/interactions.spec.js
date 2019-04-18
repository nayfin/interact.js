import test from '@interactjs/_dev/test/test';
import Signals from '@interactjs/utils/Signals';
import Interaction from './Interaction';
import interactions from './interactions';
import * as helpers from './tests/_helpers';
test('interactions', (t) => {
    let scope = helpers.mockScope();
    const interaction = scope.interactions.new({ pointerType: 'TEST' });
    t.equal(scope.interactions.list[0], interaction, 'new Interaction is pushed to scope.interactions');
    t.ok(scope.interactions instanceof Object, 'interactions object added to scope');
    const listeners = scope.interactions.listeners;
    t.ok(interactions.methodNames.reduce((acc, m) => acc && typeof listeners[m] === 'function', true), 'interactions object added to scope');
    scope = helpers.mockScope();
    const newInteraction = scope.interactions.new({});
    t.assert(typeof scope.interactions === 'object');
    t.assert(scope.interactions.signals instanceof Signals);
    t.assert(typeof scope.interactions.new === 'function');
    t.assert(newInteraction instanceof Interaction);
    t.equal(newInteraction._signals, scope.interactions.signals);
    t.assert(typeof scope.actions === 'object');
    t.deepEqual(scope.actions.names, []);
    t.deepEqual(scope.actions.methodDict, {});
    t.end();
});
test('interactions document event options', (t) => {
    const scope = helpers.mockScope();
    const doc = scope.document;
    let options = {};
    scope.browser = { isIOS: false };
    scope.signals.fire('add-document', { doc, scope, options });
    t.deepEqual(options, {}, 'no doc options.event.passive is added when not iOS');
    options = {};
    scope.browser.isIOS = true;
    scope.signals.fire('add-document', { doc, scope, options });
    t.deepEqual(options, { events: { passive: false } }, 'doc options.event.passive is set to false for iOS');
    t.end();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJhY3Rpb25zLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnRlcmFjdGlvbnMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLElBQUksTUFBTSw0QkFBNEIsQ0FBQTtBQUM3QyxPQUFPLE9BQU8sTUFBTSwyQkFBMkIsQ0FBQTtBQUMvQyxPQUFPLFdBQVcsTUFBTSxlQUFlLENBQUE7QUFDdkMsT0FBTyxZQUFZLE1BQU0sZ0JBQWdCLENBQUE7QUFDekMsT0FBTyxLQUFLLE9BQU8sTUFBTSxrQkFBa0IsQ0FBQTtBQUUzQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDekIsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFBO0lBRS9CLE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7SUFFbkUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxXQUFXLEVBQzdDLGlEQUFpRCxDQUFDLENBQUE7SUFFcEQsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsWUFBWSxZQUFZLE1BQU0sRUFBRSxvQ0FBb0MsQ0FBQyxDQUFBO0lBRWhGLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFBO0lBRTlDLENBQUMsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLElBQUksT0FBTyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssVUFBVSxFQUFFLElBQUksQ0FBQyxFQUMvRixvQ0FBb0MsQ0FBQyxDQUFBO0lBRXZDLEtBQUssR0FBRyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUE7SUFFM0IsTUFBTSxjQUFjLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7SUFFakQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEtBQUssQ0FBQyxZQUFZLEtBQUssUUFBUSxDQUFDLENBQUE7SUFDaEQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sWUFBWSxPQUFPLENBQUMsQ0FBQTtJQUN2RCxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFHLEtBQUssVUFBVSxDQUFDLENBQUE7SUFDdEQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLFlBQVksV0FBVyxDQUFDLENBQUE7SUFDL0MsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUE7SUFFNUQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEtBQUssQ0FBQyxPQUFPLEtBQUssUUFBUSxDQUFDLENBQUE7SUFDM0MsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUNwQyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBRXpDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtBQUNULENBQUMsQ0FBQyxDQUFBO0FBRUYsSUFBSSxDQUFDLHFDQUFxQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDaEQsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFBO0lBQ2pDLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUE7SUFFMUIsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFBO0lBQ2hCLEtBQUssQ0FBQyxPQUFPLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUE7SUFDaEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFBO0lBRTNELENBQUMsQ0FBQyxTQUFTLENBQ1QsT0FBTyxFQUNQLEVBQUUsRUFDRixvREFBb0QsQ0FBQyxDQUFBO0lBRXZELE9BQU8sR0FBRyxFQUFFLENBQUE7SUFFWixLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUE7SUFDMUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFBO0lBRTNELENBQUMsQ0FBQyxTQUFTLENBQ1QsT0FBTyxFQUNQLEVBQUUsTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQzlCLG1EQUFtRCxDQUFDLENBQUE7SUFFdEQsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFBO0FBQ1QsQ0FBQyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdGVzdCBmcm9tICdAaW50ZXJhY3Rqcy9fZGV2L3Rlc3QvdGVzdCdcbmltcG9ydCBTaWduYWxzIGZyb20gJ0BpbnRlcmFjdGpzL3V0aWxzL1NpZ25hbHMnXG5pbXBvcnQgSW50ZXJhY3Rpb24gZnJvbSAnLi9JbnRlcmFjdGlvbidcbmltcG9ydCBpbnRlcmFjdGlvbnMgZnJvbSAnLi9pbnRlcmFjdGlvbnMnXG5pbXBvcnQgKiBhcyBoZWxwZXJzIGZyb20gJy4vdGVzdHMvX2hlbHBlcnMnXG5cbnRlc3QoJ2ludGVyYWN0aW9ucycsICh0KSA9PiB7XG4gIGxldCBzY29wZSA9IGhlbHBlcnMubW9ja1Njb3BlKClcblxuICBjb25zdCBpbnRlcmFjdGlvbiA9IHNjb3BlLmludGVyYWN0aW9ucy5uZXcoeyBwb2ludGVyVHlwZTogJ1RFU1QnIH0pXG5cbiAgdC5lcXVhbChzY29wZS5pbnRlcmFjdGlvbnMubGlzdFswXSwgaW50ZXJhY3Rpb24sXG4gICAgJ25ldyBJbnRlcmFjdGlvbiBpcyBwdXNoZWQgdG8gc2NvcGUuaW50ZXJhY3Rpb25zJylcblxuICB0Lm9rKHNjb3BlLmludGVyYWN0aW9ucyBpbnN0YW5jZW9mIE9iamVjdCwgJ2ludGVyYWN0aW9ucyBvYmplY3QgYWRkZWQgdG8gc2NvcGUnKVxuXG4gIGNvbnN0IGxpc3RlbmVycyA9IHNjb3BlLmludGVyYWN0aW9ucy5saXN0ZW5lcnNcblxuICB0Lm9rKGludGVyYWN0aW9ucy5tZXRob2ROYW1lcy5yZWR1Y2UoKGFjYywgbSkgPT4gYWNjICYmIHR5cGVvZiBsaXN0ZW5lcnNbbV0gPT09ICdmdW5jdGlvbicsIHRydWUpLFxuICAgICdpbnRlcmFjdGlvbnMgb2JqZWN0IGFkZGVkIHRvIHNjb3BlJylcblxuICBzY29wZSA9IGhlbHBlcnMubW9ja1Njb3BlKClcblxuICBjb25zdCBuZXdJbnRlcmFjdGlvbiA9IHNjb3BlLmludGVyYWN0aW9ucy5uZXcoe30pXG5cbiAgdC5hc3NlcnQodHlwZW9mIHNjb3BlLmludGVyYWN0aW9ucyA9PT0gJ29iamVjdCcpXG4gIHQuYXNzZXJ0KHNjb3BlLmludGVyYWN0aW9ucy5zaWduYWxzIGluc3RhbmNlb2YgU2lnbmFscylcbiAgdC5hc3NlcnQodHlwZW9mIHNjb3BlLmludGVyYWN0aW9ucy5uZXcgPT09ICdmdW5jdGlvbicpXG4gIHQuYXNzZXJ0KG5ld0ludGVyYWN0aW9uIGluc3RhbmNlb2YgSW50ZXJhY3Rpb24pXG4gIHQuZXF1YWwobmV3SW50ZXJhY3Rpb24uX3NpZ25hbHMsIHNjb3BlLmludGVyYWN0aW9ucy5zaWduYWxzKVxuXG4gIHQuYXNzZXJ0KHR5cGVvZiBzY29wZS5hY3Rpb25zID09PSAnb2JqZWN0JylcbiAgdC5kZWVwRXF1YWwoc2NvcGUuYWN0aW9ucy5uYW1lcywgW10pXG4gIHQuZGVlcEVxdWFsKHNjb3BlLmFjdGlvbnMubWV0aG9kRGljdCwge30pXG5cbiAgdC5lbmQoKVxufSlcblxudGVzdCgnaW50ZXJhY3Rpb25zIGRvY3VtZW50IGV2ZW50IG9wdGlvbnMnLCAodCkgPT4ge1xuICBjb25zdCBzY29wZSA9IGhlbHBlcnMubW9ja1Njb3BlKClcbiAgY29uc3QgZG9jID0gc2NvcGUuZG9jdW1lbnRcblxuICBsZXQgb3B0aW9ucyA9IHt9XG4gIHNjb3BlLmJyb3dzZXIgPSB7IGlzSU9TOiBmYWxzZSB9XG4gIHNjb3BlLnNpZ25hbHMuZmlyZSgnYWRkLWRvY3VtZW50JywgeyBkb2MsIHNjb3BlLCBvcHRpb25zIH0pXG5cbiAgdC5kZWVwRXF1YWwoXG4gICAgb3B0aW9ucyxcbiAgICB7fSxcbiAgICAnbm8gZG9jIG9wdGlvbnMuZXZlbnQucGFzc2l2ZSBpcyBhZGRlZCB3aGVuIG5vdCBpT1MnKVxuXG4gIG9wdGlvbnMgPSB7fVxuXG4gIHNjb3BlLmJyb3dzZXIuaXNJT1MgPSB0cnVlXG4gIHNjb3BlLnNpZ25hbHMuZmlyZSgnYWRkLWRvY3VtZW50JywgeyBkb2MsIHNjb3BlLCBvcHRpb25zIH0pXG5cbiAgdC5kZWVwRXF1YWwoXG4gICAgb3B0aW9ucyxcbiAgICB7IGV2ZW50czogeyBwYXNzaXZlOiBmYWxzZSB9IH0sXG4gICAgJ2RvYyBvcHRpb25zLmV2ZW50LnBhc3NpdmUgaXMgc2V0IHRvIGZhbHNlIGZvciBpT1MnKVxuXG4gIHQuZW5kKClcbn0pXG4iXX0=