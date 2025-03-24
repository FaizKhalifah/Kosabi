class RoomViewModel{
    static format(room){
        return {
            id: room.id,
            number: room.number,
            type: room.type,
            price: `$${room.price}`,
            status: room.status === 'available' ? '🟢 Available' : '🔴 Not Available',
          };
    }

    static formatList(rooms) {
        return rooms.map(this.format);
      }
}

module.exports = RoomViewModel;