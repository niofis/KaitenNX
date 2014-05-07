describe('KaitenNX UI lib Global', function() {
  it('contains spec with an expectation', function() {
    expect(true).toBe(true);
  });

  it('should define KaitenNX global interface', function () {
    expect(window.KaitenNX).toBeDefined();
  });

  describe('Interface', function () {
    it('should push a new frame', function () {
      window.KaitenNX.push();
      expect($('.kaitennx-container').children().length).toBe(1);

      window.KaitenNX.push();
      expect($('.kaitennx-container').children().length).toBe(2);
    });
  });
});

