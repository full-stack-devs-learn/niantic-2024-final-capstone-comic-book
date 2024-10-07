package com.niantic.data;

import com.niantic.models.Trade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

@Repository
public class MySqlTradeDao implements TradeDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MySqlTradeDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Override
    public Trade getTradeByTradeId(int tradeId) {
        String sql = "SELECT * FROM trade WHERE trade_id = ?";
        SqlRowSet rowSet = jdbcTemplate.queryForRowSet(sql, tradeId);
        if (rowSet.next()) {
            return mapRow(rowSet);
        }
        return null;
    }

    @Override
    public List<Trade> getAllTrades() {
        List<Trade> trades = new ArrayList<>();
        String sql = "SELECT * FROM trade";
        SqlRowSet rowSet = jdbcTemplate.queryForRowSet(sql);
        while (rowSet.next()) {
            trades.add(mapRow(rowSet));
        }
        return trades;
    }

    @Override
    public Trade addTrade(Trade trade) {
        String sql = "INSERT INTO trade (user_a_id, user_b_id, comic_a_book_id, comic_b_book_id, trade_status, user_a_received, user_b_received) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, trade.getUserAId());
            ps.setInt(2, trade.getUserBId());
            ps.setInt(3, trade.getComicABookId());
            ps.setInt(4, trade.getComicBBookId());
            ps.setString(5, trade.getTradeStatus());
            ps.setBoolean(6, trade.isUserAReceived());
            ps.setBoolean(7, trade.isUserBReceived());
            return ps;
        }, keyHolder);

        trade.setTradeId(keyHolder.getKey().intValue());
        return trade;
    }

    @Override
    public void updateTradeStatus(int tradeId, String status) {
        String sql = "UPDATE trade SET trade_status = ? WHERE trade_id = ?";
        jdbcTemplate.update(sql, status, tradeId);
    }

    @Override
    public void updateTradeReceived(int tradeId, int userId, boolean received) {
        String sql;
        if (isUserA(tradeId, userId)) {
            sql = "UPDATE trade SET user_a_received = ? WHERE trade_id = ?";
        } else {
            sql = "UPDATE trade SET user_b_received = ? WHERE trade_id = ?";
        }
        jdbcTemplate.update(sql, received, tradeId);
    }

    @Override
    public void deleteTrade(int tradeId) {
        String sql = "DELETE FROM trade WHERE trade_id = ?";
        jdbcTemplate.update(sql, tradeId);
    }

    private Trade mapRow(SqlRowSet rowSet) {
        int tradeId = rowSet.getInt("trade_id");
        int userAId = rowSet.getInt("user_a_id");
        int userBId = rowSet.getInt("user_b_id");
        int comicABookId = rowSet.getInt("comic_a_book_id");
        int comicBBookId = rowSet.getInt("comic_b_book_id");
        String tradeStatus = rowSet.getString("trade_status");
        boolean userAReceived = rowSet.getBoolean("user_a_received");
        boolean userBReceived = rowSet.getBoolean("user_b_received");

        return new Trade(tradeId, userAId, userBId, comicABookId, comicBBookId, tradeStatus, userAReceived, userBReceived);
    }

    private boolean isUserA(int tradeId, int userId) {
        String sql = "SELECT user_a_id FROM trade WHERE trade_id = ?";
        Integer userAId = jdbcTemplate.queryForObject(sql, new Object[]{tradeId}, Integer.class);
        return userAId != null && userAId == userId;
    }
}
